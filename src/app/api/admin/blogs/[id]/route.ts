import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const blogs = await db.getAllBlogs();
    const blog = blogs.find((b: any) => b.id === id || b.slug === id);

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
