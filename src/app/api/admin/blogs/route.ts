import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { slugify } from '@/lib/utils';

export async function GET() {
  try {
    const blogs = await db.getAllBlogs();
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, excerpt, content, category, tags, coverImage, authorName, authorRole, readTime, isFeatured, isPublished } = body;

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required.' }, { status: 400 });
    }

    const slug = body.slug ? slugify(body.slug) : slugify(title);

    const saved = await db.saveBlog({
      slug,
      title,
      excerpt: excerpt || title,
      content,
      category: category || 'Technology',
      tags: typeof tags === 'string' ? tags : JSON.stringify(tags || []),
      coverImage: coverImage || null,
      authorName: authorName || 'Avora Engineering',
      authorRole: authorRole || 'Staff Architect',
      readTime: readTime || '5 min read',
      isFeatured: !!isFeatured,
      isPublished: isPublished !== undefined ? isPublished : true,
    });

    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save blog' }, { status: 500 });
  }
}
