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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!Array.isArray(body)) {
      return NextResponse.json({ error: 'Navigation must be an array of items' }, { status: 400 });
    }
    const saved = await db.saveNavigation(body);
    return NextResponse.json(saved, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Failed to save navigation' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  return POST(request);
}
