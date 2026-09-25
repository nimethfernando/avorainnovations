import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const config = await db.getCostCalculatorSettings();
    return NextResponse.json(config);
  } catch (error) {
    console.error('Failed to get cost calculator settings:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}
