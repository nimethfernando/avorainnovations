import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const list = await db.getAllTechnologies();
    return NextResponse.json(list);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch technologies' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.category || !body.slug) {
      return NextResponse.json({ error: 'Category name and slug are required' }, { status: 400 });
    }
    const saved = await db.saveTechnology(body);
    return NextResponse.json(saved, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to save technology' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }
    await db.deleteTechnology(slug);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete technology' }, { status: 500 });
  }
}
