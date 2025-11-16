import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';
import { env } from '../config/env.js';

let transporter: Transporter | null = null;

if (env.isEmailConfigured) {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: env.EMAIL_USER!,
      pass: env.EMAIL_PASSWORD!,
    },
    tls: {
      rejectUnauthorized: false, // Accept self-signed certificates
    },
  });
  console.log('📧 Email notifications enabled');
} else {
  console.log('📧 Email notifications disabled (no credentials configured)');
}

export async function sendHellNotification(
  exEmail: string,
  userName: string,
  reason: string
): Promise<void> {
  if (!transporter || !env.isEmailConfigured) {
    console.log('Email not configured, skipping notification');
    return;
  }

  const mailOptions = {
    from: env.EMAIL_USER!,
    to: exEmail,
    subject: '🔥 Your Ex Just Failed at Productivity',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #1a1a1a; color: #ff6b6b;">
        <h1 style="color: #ff3838; text-align: center;">🔥 SISYPHUS PRODUCTIVITY ALERT 🔥</h1>

        <div style="background-color: #2d2d2d; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h2 style="color: #ff6b6b;">They Failed. Again.</h2>
          <p style="font-size: 16px; line-height: 1.6;">
            Remember <strong>${userName}</strong>? Yeah, that person you used to know.
          </p>
          <p style="font-size: 16px; line-height: 1.6;">
            Well, they just got sent to productivity hell because:
          </p>
          <blockquote style="background-color: #3d3d3d; padding: 15px; border-left: 4px solid #ff3838; margin: 20px 0;">
            <em style="color: #ffaa00;">"${reason}"</em>
          </blockquote>
          <p style="font-size: 16px; line-height: 1.6;">
            The boulder has rolled back down the hill. Again.
          </p>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <p style="font-size: 18px; color: #ffaa00;">
            You made the right choice. 👍
          </p>
        </div>

        <hr style="border: 1px solid #3d3d3d; margin: 30px 0;">

        <p style="font-size: 12px; color: #888; text-align: center;">
          This notification was sent by Sisyphus Productivity App<br>
          Making Hard Deadlines Since Forever<br>
          <em>The boulder never stops rolling</em>
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}
