import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email address is required.' }, { status: 400 });
    }

    const subscriber = await db.addSubscriber(email);
    return NextResponse.json({ success: true, subscriber }, { status: 201 });
  } catch (error) {
    console.error('[API NEWSLETTER ERROR]:', error);
    return NextResponse.json({ error: 'Subscription failed.' }, { status: 500 });
  }
}
