import nodemailer from 'nodemailer';

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail({ to, subject, html, text }: EmailOptions): Promise<boolean> {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.EMAIL_USER || process.env.SMTP_USER;
  const pass = process.env.EMAIL_PASS || process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || (user ? `AVORA Innovations <${user}>` : 'AVORA Innovations <notifications@avorainnovations.com>');

  if (!user || user === 'notifications@avorainnovations.com' || !pass || pass === 'your-app-password') {
    console.log(`[SMTP MOCK] Email would be sent to: ${to}`);
    console.log(`[SMTP MOCK] Subject: ${subject}`);
    console.log(`[SMTP MOCK] Body:\n${text || html}`);
    return true;
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    });

    await transporter.sendMail({
      from,
      to,
      subject,
      text: text || html.replace(/<[^>]*>?/gm, ''),
      html,
    });

    return true;
  } catch (error) {
    console.error('[SMTP ERROR] Failed to send email via nodemailer:', error);
    return false;
  }
}

export function generateInquiryEmailHtml(inquiry: {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  service?: string | null;
  budget?: string | null;
  timeline?: string | null;
  message: string;
}): string {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #f8fafc; border-radius: 12px; overflow: hidden; border: 1px solid #1e293b;">
      <div style="background: linear-gradient(135deg, #2563eb, #7c3aed); padding: 28px 24px; text-align: center;">
        <h1 style="margin: 0; color: #ffffff; font-size: 24px; letter-spacing: -0.5px;">AVORA INNOVATIONS</h1>
        <p style="margin: 6px 0 0 0; color: #e2e8f0; font-size: 14px;">New Client Consultation Lead Received</p>
      </div>
      <div style="padding: 24px;">
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #334155; color: #94a3b8; width: 140px;">Client Name</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #334155; color: #f8fafc; font-weight: 600;">${inquiry.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #334155; color: #94a3b8;">Email Address</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #334155; color: #38bdf8;"><a href="mailto:${inquiry.email}" style="color: #38bdf8; text-decoration: none;">${inquiry.email}</a></td>
          </tr>
          ${inquiry.phone ? `<tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #334155; color: #94a3b8;">Phone Number</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #334155; color: #f8fafc;">${inquiry.phone}</td>
          </tr>` : ''}
          ${inquiry.company ? `<tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #334155; color: #94a3b8;">Company / Org</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #334155; color: #f8fafc;">${inquiry.company}</td>
          </tr>` : ''}
          ${inquiry.service ? `<tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #334155; color: #94a3b8;">Interested Service</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #334155; color: #a855f7; font-weight: 600;">${inquiry.service}</td>
          </tr>` : ''}
          ${inquiry.budget ? `<tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #334155; color: #94a3b8;">Budget Scope</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #334155; color: #34d399; font-weight: 600;">${inquiry.budget}</td>
          </tr>` : ''}
        </table>
        
        <div style="background: #1e293b; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
          <h4 style="margin: 0 0 8px 0; color: #94a3b8; font-size: 13px; text-transform: uppercase;">Project Description / Notes</h4>
          <p style="margin: 0; color: #cbd5e1; line-height: 1.6; white-space: pre-line;">${inquiry.message}</p>
        </div>

        <div style="text-align: center;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/admin/inquiries" style="display: inline-block; background: #2563eb; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600; font-size: 14px;">Open Lead in Admin Portal</a>
        </div>
      </div>
      <div style="background: #020617; padding: 16px; text-align: center; font-size: 12px; color: #64748b;">
        © ${new Date().getFullYear()} AVORA Innovations Inc. Confidential Notification.
      </div>
    </div>
  `;
}
