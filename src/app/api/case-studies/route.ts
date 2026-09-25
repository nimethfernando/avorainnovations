import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const studies = await db.getAllCaseStudies();
    return NextResponse.json(studies);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch case studies' }, { status: 500 });
  }
}
