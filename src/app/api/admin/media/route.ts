import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const list = await db.getAllMedia();
    return NextResponse.json(list);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch media' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || '';

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('file') as File | null;
      const category = (formData.get('category') as string) || 'Uploads';

      if (!file) {
        return NextResponse.json({ error: 'No file provided' }, { status: 400 });
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      let publicUrl = '';
      try {
        const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }

        const safeName = Date.now() + '-' + file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const filePath = path.join(uploadsDir, safeName);
        fs.writeFileSync(filePath, buffer);
        publicUrl = `/uploads/${safeName}`;
      } catch (fsErr) {
        // Fallback for serverless environments (e.g. Vercel read-only filesystem)
        const mime = file.type || 'image/png';
        const base64 = buffer.toString('base64');
        publicUrl = `data:${mime};base64,${base64}`;
      }
      const mediaItem = {
        id: 'media-' + Date.now(),
        name: file.name,
        url: publicUrl,
        type: file.type || 'image/png',
        size: `${(file.size / 1024).toFixed(1)} KB`,
        category,
        createdAt: new Date().toISOString(),
      };

      const saved = await db.saveMedia(mediaItem);
      return NextResponse.json(saved, { status: 201 });
    } else {
      // JSON registration of existing URL or asset
      const body = await request.json();
      if (!body.url || !body.name) {
        return NextResponse.json({ error: 'Name and URL are required' }, { status: 400 });
      }
      const mediaItem = {
        id: body.id || 'media-' + Date.now(),
        name: body.name,
        url: body.url,
        type: body.type || 'image/png',
        dimensions: body.dimensions || 'Custom',
        category: body.category || 'General',
        createdAt: new Date().toISOString(),
      };
      const saved = await db.saveMedia(mediaItem);
      return NextResponse.json(saved, { status: 201 });
    }
  } catch (error: any) {
    console.error('Media upload error:', error);
    return NextResponse.json({ error: error.message || 'Failed to process media' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Media ID is required' }, { status: 400 });
    }
    await db.deleteMedia(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete media' }, { status: 500 });
  }
}
