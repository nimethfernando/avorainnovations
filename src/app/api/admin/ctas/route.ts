import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const list = await db.getAllCTAs();
    return NextResponse.json(list);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch CTAs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.title) {
      return NextResponse.json({ error: 'CTA Title is required' }, { status: 400 });
    }
    const saved = await db.saveCTA(body);
    return NextResponse.json(saved, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to save CTA' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'CTA ID is required' }, { status: 400 });
    }
    await db.deleteCTA(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete CTA' }, { status: 500 });
  }
}
