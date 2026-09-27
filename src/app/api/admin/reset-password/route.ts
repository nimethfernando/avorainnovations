import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { hashPassword } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, otp, token, newPassword } = await request.json();

    const codeToVerify = (otp || token || '').toString().trim();
    const targetEmail = (email || '').toString().trim().toLowerCase();

    if (!codeToVerify) {
      return NextResponse.json({ error: 'Please enter the 6-digit OTP verification code.' }, { status: 400 });
    }

    if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 8) {
      return NextResponse.json(
        { error: 'New password must be at least 8 characters long.' },
        { status: 400 }
      );
    }

    let verifiedEmail = targetEmail;

    // 1. Verify via OTP + Email if email provided
    if (targetEmail) {
      const otpRes = await db.verifyPasswordResetOtp(targetEmail, codeToVerify);
      if (!otpRes.valid || !otpRes.email) {
        return NextResponse.json(
          { error: otpRes.error || 'Invalid or expired 6-digit OTP code.' },
          { status: 400 }
        );
      }
      verifiedEmail = otpRes.email;
    } else {
      // 2. Fallback to token lookup
      const tokenRes = await db.verifyPasswordResetToken(codeToVerify);
      if (!tokenRes.valid || !tokenRes.email) {
        return NextResponse.json(
          { error: tokenRes.error || 'Invalid or expired verification code.' },
          { status: 400 }
        );
      }
      verifiedEmail = tokenRes.email;
    }

    const hashed = hashPassword(newPassword);
    await db.updateAdminPassword(verifiedEmail, hashed.hash);
    await db.markResetOtpUsed(verifiedEmail);
    await db.markResetTokenUsed(codeToVerify);

    return NextResponse.json({
      success: true,
      message: 'Master password has been reset successfully. You can now log in with your new password.',
    });
  } catch (error) {
    console.error('[RESET PASSWORD OTP ERROR]:', error);
    return NextResponse.json({ error: 'Failed to reset password.' }, { status: 500 });
  }
}
