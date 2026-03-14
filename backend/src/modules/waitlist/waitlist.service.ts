import { pool } from '../../config/db.js';
import { WaitlistInput } from './waitlist.schemas.js';
import { sendMail } from '../../utils/mailer.js';
import { logger } from '../../utils/logger.js';

function buildConfirmationEmail(full_name: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>You're on the ManoBandhu Waitlist!</title>
</head>
<body style="margin:0;padding:0;background:#F5F0E8;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table width="600" cellpadding="0" cellspacing="0"
               style="background:#ffffff;border-radius:16px;overflow:hidden;
                      box-shadow:0 4px 24px rgba(26,92,74,0.10);">

          <!-- Header -->
          <tr>
            <td style="background:#1A5C4A;padding:32px 40px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:700;
                         letter-spacing:-0.5px;">ManoBandhu</h1>
              <p style="margin:6px 0 0;color:rgba(255,255,255,0.75);font-size:13px;">
                Healing Hearts, Calming Minds
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;color:#1A3C2E;">
              <h2 style="margin:0 0 16px;font-size:22px;color:#1A5C4A;">
                Welcome to ManoBandhu, ${full_name}! 💚
              </h2>
              <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:#2E4A3A;">
                Thank you for joining our pilot study waitlist. You'll be among the first to
                experience ManoBandhu when our 8-week pilot begins in <strong>June 2026</strong>.
                We'll reach out to you at this email with next steps.
              </p>

              <!-- Divider -->
              <hr style="border:none;border-top:1px solid #D8EDE4;margin:28px 0;" />

              <h3 style="margin:0 0 14px;font-size:16px;color:#1A5C4A;">What to expect:</h3>
              <ul style="margin:0;padding-left:20px;font-size:14px;line-height:2;color:#2E4A3A;">
                <li>📬 An invite email in <strong>May 2026</strong></li>
                <li>🧠 8 weeks of guided emotional wellness</li>
                <li>💡 Your feedback will shape the future of ManoBandhu</li>
              </ul>

              <div style="margin-top:32px;padding:20px 24px;background:#F0FAF5;
                          border-left:4px solid #1A5C4A;border-radius:8px;">
                <p style="margin:0;font-size:13px;color:#2E4A3A;line-height:1.6;">
                  If you have any questions, just reply to this email.
                  We read every message! 🌿
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;background:#F5F0E8;text-align:center;
                       border-top:1px solid #E8DFD0;">
              <p style="margin:0;font-size:12px;color:#6B8A7A;line-height:1.8;">
                Healing Hearts, Calming Minds.<br/>
                <a href="mailto:manobandhu.mindcare@gmail.com"
                   style="color:#1A5C4A;text-decoration:none;">
                  manobandhu.mindcare@gmail.com
                </a>
                &nbsp;|&nbsp;
                <a href="https://www.manobandhu.in"
                   style="color:#1A5C4A;text-decoration:none;">
                  www.manobandhu.in
                </a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export async function joinWaitlist(
  data: WaitlistInput
): Promise<{ alreadyRegistered: boolean; id: string }> {
  const { full_name, email, mobile, occupation, city } = data;

  // Check for duplicate
  const existing = await pool.query<{ id: string }>(
    'SELECT id FROM pilot_waitlist WHERE email = $1',
    [email]
  );
  if (existing.rowCount && existing.rowCount > 0) {
    return { alreadyRegistered: true, id: existing.rows[0].id };
  }

  // Insert
  const { rows } = await pool.query<{ id: string }>(
    `INSERT INTO pilot_waitlist (full_name, email, mobile, occupation, city)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id`,
    [full_name, email, mobile, occupation ?? null, city ?? null]
  );
  const id = rows[0].id;
  logger.info(`[waitlist] New signup: ${email}`);

  // Send confirmation email (non-blocking)
  sendMail(
    email,
    "You're on the ManoBandhu Waitlist! 🌿",
    buildConfirmationEmail(full_name)
  ).catch((err) => logger.error('[mailer] Failed to send waitlist email', err));

  return { alreadyRegistered: false, id };
}

export async function getPilotWaitlist(page = 1, limit = 50) {
  const offset = (page - 1) * limit;
  const { rows } = await pool.query(
    `SELECT id, full_name, email, mobile, occupation, city, created_at
     FROM pilot_waitlist
     ORDER BY created_at DESC
     LIMIT $1 OFFSET $2`,
    [limit, offset]
  );
  const { rows: c } = await pool.query('SELECT COUNT(*) AS total FROM pilot_waitlist');
  return { data: rows, total: Number(c[0].total), page, limit };
}
