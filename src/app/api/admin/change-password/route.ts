import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAdminToken, hashPassword, verifyPassword } from '@/lib/auth';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('avora_admin_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = await verifyAdminToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword || newPassword.length < 8) {
      return NextResponse.json(
        { error: 'New password must be at least 8 characters.' },
        { status: 400 }
      );
    }

    const admin = await db.findAdminByEmail(payload.email);
    if (!admin) {
      return NextResponse.json({ error: 'Admin not found.' }, { status: 404 });
    }

    const isMatch = verifyPassword(currentPassword, admin.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Current password does not match.' }, { status: 400 });
    }

    const hashed = hashPassword(newPassword);
    await db.updateAdminPassword(payload.email, hashed.hash);

    return NextResponse.json({ success: true, message: 'Password updated successfully.' });
  } catch (error) {
    console.error('[CHANGE PASSWORD ERROR]:', error);
    return NextResponse.json({ error: 'Failed to update password.' }, { status: 500 });
  }
}
