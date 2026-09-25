import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const seo = await db.getSEOSettings();
    return NextResponse.json(seo);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch SEO settings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const saved = await db.saveSEOSettings(body);
    return NextResponse.json(saved, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Failed to save SEO settings' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  return POST(request);
}
