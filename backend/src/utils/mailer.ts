import nodemailer from 'nodemailer';
import { logger } from './logger.js';

const isDev = process.env.NODE_ENV !== 'production';

// In development: use Ethereal (fake SMTP) or just log instead of sending
const transporter = nodemailer.createTransport(
  isDev
    ? {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: { user: 'ethereal_user', pass: 'ethereal_pass' }, // won't actually send
      }
    : {
        host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
        port: Number(process.env.SMTP_PORT ?? 587),
        secure: false, // TLS via STARTTLS
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      }
);

export async function sendMail(to: string, subject: string, html: string): Promise<void> {
  if (isDev) {
    logger.info(`[mailer] DEV — skipping real send. To: ${to} | Subject: ${subject}`);
    return;
  }

  await transporter.sendMail({
    from: process.env.SMTP_FROM ?? '"ManoBandhu" <manobandhu.mindcare@gmail.com>',
    to,
    subject,
    html,
  });

  logger.info(`[mailer] Email sent → ${to} | ${subject}`);
}
