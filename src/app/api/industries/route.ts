import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const industries = await db.getAllIndustries();
    return NextResponse.json(industries);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch industries' }, { status: 500 });
  }
}
