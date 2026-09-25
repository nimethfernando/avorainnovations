import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const ctas = await db.getAllCTAs();
    return NextResponse.json(ctas);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch CTAs' }, { status: 500 });
  }
}
