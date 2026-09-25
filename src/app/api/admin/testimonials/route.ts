import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const list = await db.getAllTestimonials();
    return NextResponse.json(list);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.quote || !body.author) {
      return NextResponse.json({ error: 'Quote and author are required' }, { status: 400 });
    }
    const saved = await db.saveTestimonial(body);
    return NextResponse.json(saved, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to save testimonial' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    await db.deleteTestimonial(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
  }
}
