import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sendEmail, generateInquiryEmailHtml } from '@/lib/mailer';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, service, budget, timeline, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    // Save lead in database
    const inquiry = await db.createInquiry({
      name,
      email,
      phone,
      company,
      service,
      budget,
      timeline,
      message,
    });

    // Send instant email notification via Nodemailer to the currently configured CMS email
    const emailHtml = generateInquiryEmailHtml(inquiry);
    const settings = await db.getSettings();
    let locations: any[] = [];
    try {
      locations = await db.getAllLocations();
    } catch {}
    const primaryOffice = locations.find((l) => l.isPrimary) || locations[0];
    const notificationTo =
      settings?.contactEmail?.trim() ||
      primaryOffice?.email?.trim() ||
      process.env.ADMIN_NOTIFICATION_EMAIL?.trim() ||
      'avorainnovation@gmail.com';

    console.log(`[API INQUIRIES] Dispatching lead notification to: ${notificationTo}`);

    await sendEmail({
      to: notificationTo,
      replyTo: inquiry.email,
      subject: `[NEW INQUIRY] ${name} - ${service || 'General'} (${company || 'Enterprise'})`,
      html: emailHtml,
      text: `New consultation lead from ${name} (${email}):\nPhone: ${phone || 'N/A'}\nCompany: ${company || 'N/A'}\nService: ${service || 'N/A'}\nBudget: ${budget || 'N/A'}\nTimeline: ${timeline || 'N/A'}\n\nMessage:\n${message}`,
    });

    return NextResponse.json(
      { success: true, message: 'Consultation request submitted successfully.', inquiryId: inquiry.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('[API INQUIRIES ERROR]:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your consultation request.' },
      { status: 500 }
    );
  }
}
