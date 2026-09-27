import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { hashPassword } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { token, newPassword } = await request.json();

    if (!token || typeof token !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid reset token.' }, { status: 400 });
    }

    if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long.' },
        { status: 400 }
      );
    }

    const verification = await db.verifyPasswordResetToken(token);
    if (!verification.valid || !verification.email) {
      return NextResponse.json(
        { error: verification.error || 'Invalid or expired password reset link.' },
        { status: 400 }
      );
    }

    const hashed = hashPassword(newPassword);
    await db.updateAdminPassword(verification.email, hashed.hash);
    await db.markResetTokenUsed(token);

    return NextResponse.json({
      success: true,
      message: 'Your administrator password has been updated successfully. You can now log in.',
    });
  } catch (error) {
    console.error('[RESET PASSWORD ERROR]:', error);
    return NextResponse.json({ error: 'Failed to reset password.' }, { status: 500 });
  }
}
