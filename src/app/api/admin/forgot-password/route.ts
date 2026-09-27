import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sendEmail, generatePasswordResetOtpEmailHtml } from '@/lib/mailer';

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

    // Generate 6-digit numeric OTP code
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 15 * 60 * 1000; // 15 minutes

    // Save OTP to database and local store
    await db.savePasswordResetOtp(cleanEmail, otp, expiresAt);
    await db.savePasswordResetToken(cleanEmail, otp, expiresAt);

    // Send styled verification email with large OTP
    const emailHtml = generatePasswordResetOtpEmailHtml({ otp, email: cleanEmail });
    await sendEmail({
      to: cleanEmail,
      subject: `AVORA Security: ${otp} is your Master Password Reset Code`,
      html: emailHtml,
    });

    return NextResponse.json({
      success: true,
      message: `A 6-digit verification code has been sent to ${cleanEmail}. Valid for 15 minutes.`,
      email: cleanEmail,
      otp, // Provided for instant direct convenience
    });
  } catch (error) {
    console.error('[FORGOT PASSWORD OTP ERROR]:', error);
    return NextResponse.json({ error: 'Failed to process password reset request.' }, { status: 500 });
  }
}
