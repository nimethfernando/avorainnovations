import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const nav = await db.getNavigation();
    return NextResponse.json(nav);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch navigation' }, { status: 500 });
  }
}
