import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const config = await db.getCostCalculatorSettings();
    return NextResponse.json(config);
  } catch (error) {
    console.error('Admin failed to get cost calculator settings:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const updated = await db.saveCostCalculatorSettings(body);
    return NextResponse.json({ success: true, config: updated });
  } catch (error) {
    console.error('Admin failed to update cost calculator settings:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
