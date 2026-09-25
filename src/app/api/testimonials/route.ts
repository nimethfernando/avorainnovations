import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { TESTIMONIALS_DATA } from '@/lib/content';

export async function GET() {
  try {
    const list = await db.getAllTestimonials();
    if (Array.isArray(list) && list.length > 0) {
      return NextResponse.json(list);
    }
    return NextResponse.json(TESTIMONIALS_DATA);
  } catch {
    return NextResponse.json(TESTIMONIALS_DATA);
  }
}

