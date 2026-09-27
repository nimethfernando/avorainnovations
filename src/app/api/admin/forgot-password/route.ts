import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { db } from '@/lib/db';
import { sendEmail, generatePasswordResetEmailHtml } from '@/lib/mailer';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const admin = await db.findAdminByEmail(cleanEmail);

    if (!admin) {
      return NextResponse.json(
        { error: 'No administrator account found with that email address.' },
        { status: 404 }
      );
    }

    // Generate cryptographically secure reset token
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = Date.now() + 60 * 60 * 1000; // 1 hour

    await db.savePasswordResetToken(cleanEmail, token, expiresAt);

    // Build base URL
    const forwardedHost = request.headers.get('x-forwarded-host') || request.headers.get('host');
    const forwardedProto = request.headers.get('x-forwarded-proto') || 'http';
    const baseUrl = forwardedHost
      ? `${forwardedProto}://${forwardedHost}`
      : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const resetUrl = `${baseUrl}/admin/reset-password?token=${token}`;

    // Send email via configured SMTP
    const emailHtml = generatePasswordResetEmailHtml({ resetUrl, email: cleanEmail });
    await sendEmail({
      to: cleanEmail,
      subject: 'AVORA Executive Portal — Reset Your Admin Password',
      html: emailHtml,
    });

    return NextResponse.json({
      success: true,
      message: `Password reset link has been dispatched to ${cleanEmail}. Check your inbox.`,
      resetUrl, // Provided for direct convenience
    });
  } catch (error) {
    console.error('[FORGOT PASSWORD ERROR]:', error);
    return NextResponse.json({ error: 'Failed to process password reset request.' }, { status: 500 });
  }
}
