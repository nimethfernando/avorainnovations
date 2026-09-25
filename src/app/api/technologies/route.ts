import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const techs = await db.getAllTechnologies();
    return NextResponse.json(techs);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch technologies' }, { status: 500 });
  }
}
