import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

interface RouteContext {
  params: Promise<{ slug: string[] }>;
}

export async function GET(request: Request, { params }: RouteContext) {
  try {
    const { slug } = await params;
    const pageSlug = slug.join('/');
    const page = await db.getPage(pageSlug);

    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    return NextResponse.json(page);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve page' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: RouteContext) {
  try {
    const { slug } = await params;
    const pageSlug = slug.join('/');
    const body = await request.json();

    const saved = await db.savePage({
      slug: pageSlug,
      title: body.title,
      description: body.description,
      sections: typeof body.sections === 'string' ? body.sections : JSON.stringify(body.sections || []),
      metaTitle: body.metaTitle,
      metaDesc: body.metaDesc,
      isPublished: body.isPublished !== undefined ? body.isPublished : true,
    });

    return NextResponse.json(saved);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update page' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: RouteContext) {
  try {
    const { slug } = await params;
    const pageSlug = slug.join('/');
    await db.deletePage(pageSlug);
    return NextResponse.json({ success: true, message: 'Page deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete page' }, { status: 500 });
  }
}
