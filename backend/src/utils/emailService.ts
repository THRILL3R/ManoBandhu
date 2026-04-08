import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendConfirmationEmail = async (
  userEmail: string,
  userName?: string
) => {
  const firstName = userName ? userName.split(" ")[0] : "there";

  await transporter.sendMail({
    from: `"ManoBandhu" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: "ManoBandhu: Thank you for registering for the Pilot Study",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; line-height: 1.6;">
        <p>Hello ${firstName},</p>
        <p>Thank you for registering for the ManoBandhu 8-week Pilot Study beginning in June 2026. We truly appreciate your interest in being part of this initiative.</p>
        <p>Your response has been successfully received. Our team will review the registrations and contact you shortly with the next steps.</p>
        <p>We are grateful for your willingness to contribute to this journey of building a space that supports emotional awareness, personal growth, and meaningful reflection.</p>
        <p>Join us on WhatsApp to stay connected for further communication!</p>
        <a href="https://chat.whatsapp.com/B5gWfsIkgRR6tRtbBj2ru0?mode=gi_t" style="color: #1A5C4A; text-decoration: none;">Join us on WhatsApp</a>
        <p>Warm regards,</p>
        <p><strong>Team ManoBandhu</strong><br/>
        Website: <a href="https://www.manobandhu.com" style="color: #1A5C4A; text-decoration: none;">www.manobandhu.com</a><br/>
        Contact: +91 8087151656</p>
      </div>
    `,
  });
};
