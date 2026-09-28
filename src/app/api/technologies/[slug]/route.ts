import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const page = await db.getTechnologyPageBySlug(slug);
    if (!page) {
      return NextResponse.json({ error: 'Technology page not found' }, { status: 404 });
    }
    return NextResponse.json(page);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to retrieve technology page' }, { status: 500 });
  }
}
