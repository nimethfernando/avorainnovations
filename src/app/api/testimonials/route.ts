import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { TESTIMONIALS_DATA } from '@/lib/content';

export async function GET() {
  try {
    const raw = await db.getAllTestimonials();
    // Filter out obvious test noise (e.g. quote < 15 chars, or test placeholders)
    const valid = Array.isArray(raw)
      ? raw.filter((t: any) => {
          if (!t || !t.quote || typeof t.quote !== 'string') return false;
          const q = t.quote.trim().toLowerCase();
          const a = (t.author || '').trim().toLowerCase();
          if (q.length < 15) return false;
          if (a.includes('testqoute') || q.includes('greate coomany') || a === 'test' || q === 'test') return false;
          return true;
        })
      : [];

    if (valid.length > 0) {
      // Complement with default high-quality reviews so the showcase is always complete
      const existingIds = new Set(valid.map((v: any) => v.id));
      const combined = [
        ...valid.map((v: any) => ({
          ...v,
          rating: v.rating || 5,
          fullReview: v.fullReview || v.quote,
          metric: v.metric || 'Enterprise Quality Verified',
          project: v.project || 'Custom Software Engineering',
        })),
        ...TESTIMONIALS_DATA.filter((d) => !existingIds.has(d.id)),
      ];
      return NextResponse.json(combined);
    }

    return NextResponse.json(TESTIMONIALS_DATA);
  } catch {
    return NextResponse.json(TESTIMONIALS_DATA);
  }
}

