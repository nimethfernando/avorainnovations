import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: 'Article ID or slug is required' }, { status: 400 });
    }

    const decodedId = decodeURIComponent(id).trim();
    const idLower = decodedId.toLowerCase();

    // 1. Search in getAllBlogs
    const blogs = await db.getAllBlogs();
    let blog = blogs.find(
      (b: any) =>
        b.id === id ||
        b.id === decodedId ||
        b.slug === id ||
        b.slug === decodedId ||
        b.slug?.toLowerCase() === idLower ||
        b.id?.toLowerCase() === idLower
    );

    // 2. Direct getBlogBySlug
    if (!blog) {
      blog = await db.getBlogBySlug(decodedId);
    }
    if (!blog && id !== decodedId) {
      blog = await db.getBlogBySlug(id);
    }

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve blog' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const body = await request.json();

    const saved = await db.saveBlog({
      id,
      ...body,
      tags: typeof body.tags === 'string' ? body.tags : JSON.stringify(body.tags || []),
    });

    try {
      revalidatePath('/blog');
      revalidatePath(`/blog/${id}`);
      if (body.slug && body.slug !== id) {
        revalidatePath(`/blog/${body.slug}`);
      }
      revalidatePath('/blog/[slug]', 'page');
      revalidatePath('/');
      revalidatePath('/admin/blogs');
    } catch (e) {
      console.warn('[Cache Revalidation Error]:', e);
    }

    return NextResponse.json(saved);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    await db.deleteBlog(id);

    try {
      revalidatePath('/blog');
      revalidatePath(`/blog/${id}`);
      revalidatePath('/blog/[slug]', 'page');
      revalidatePath('/');
      revalidatePath('/admin/blogs');
    } catch (e) {
      console.warn('[Cache Revalidation Error]:', e);
    }

    return NextResponse.json({ success: true, message: 'Blog deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}
