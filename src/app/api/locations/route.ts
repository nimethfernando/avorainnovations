import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { DEFAULT_LOCATIONS } from '@/lib/content';

export async function GET() {
  try {
    const list = await db.getAllLocations();
    if (Array.isArray(list) && list.length > 0) {
      return NextResponse.json(list);
    }
    return NextResponse.json(DEFAULT_LOCATIONS);
  } catch {
    return NextResponse.json(DEFAULT_LOCATIONS);
  }
}
