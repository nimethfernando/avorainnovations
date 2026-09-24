import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const pages = await db.getAllPages();
    return NextResponse.json(pages);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch pages' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { slug, title, description, sections, metaTitle, metaDesc, isPublished } = body;

    if (!slug || !title) {
      return NextResponse.json({ error: 'Slug and title are required.' }, { status: 400 });
    }

    const saved = await db.savePage({
      slug,
      title,
      description,
      sections: typeof sections === 'string' ? sections : JSON.stringify(sections || []),
      metaTitle,
      metaDesc,
      isPublished: isPublished !== undefined ? isPublished : true,
    });

    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create page' }, { status: 500 });
  }
}
