import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const list = await db.getAllTechnologyPages();
    return NextResponse.json(list);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch technology pages' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name && !body.title) {
      return NextResponse.json({ error: 'Technology name or title is required' }, { status: 400 });
    }
    const saved = await db.saveTechnologyPage(body);
    return NextResponse.json(saved, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to save technology page' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    if (!slug) {
      return NextResponse.json({ error: 'Slug parameter is required' }, { status: 400 });
    }
    await db.deleteTechnologyPage(slug);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete technology page' }, { status: 500 });
  }
}
