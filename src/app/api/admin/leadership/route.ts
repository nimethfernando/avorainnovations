import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const list = await db.getAllLeadership();
    return NextResponse.json(list);
  } catch (error) {
    console.error('[API Admin] Failed to fetch leadership:', error);
    return NextResponse.json({ error: 'Failed to fetch leadership' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name || !body.role) {
      return NextResponse.json({ error: 'Name and role are required.' }, { status: 400 });
    }
    const saved = await db.saveLeadership(body);
    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    console.error('[API Admin] Failed to save leadership:', error);
    return NextResponse.json({ error: 'Failed to save leadership' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID is required.' }, { status: 400 });
    }
    await db.deleteLeadership(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[API Admin] Failed to delete leadership:', error);
    return NextResponse.json({ error: 'Failed to delete leadership' }, { status: 500 });
  }
}
