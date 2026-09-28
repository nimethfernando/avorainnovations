import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const list = await db.getAllLeadership();
    const active = list.filter((l) => l.isActive !== false);
    return NextResponse.json(active);
  } catch (error) {
    console.error('[API] Failed to fetch leadership:', error);
    return NextResponse.json({ error: 'Failed to fetch leadership' }, { status: 500 });
  }
}
