import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { DEFAULT_LOCATIONS } from '@/lib/content';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const list = await db.getAllLocations();
    if (Array.isArray(list) && list.length > 0) {
      return NextResponse.json(list, {
        headers: { 'Cache-Control': 'no-store, max-age=0' },
      });
    }
    return NextResponse.json(DEFAULT_LOCATIONS, {
      headers: { 'Cache-Control': 'no-store, max-age=0' },
    });
  } catch {
    return NextResponse.json(DEFAULT_LOCATIONS, {
      headers: { 'Cache-Control': 'no-store, max-age=0' },
    });
  }
}
