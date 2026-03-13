import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendOtpEmail = async (user, otpCode) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // Use true for port 465, false for port 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.verify();
   

    const info = await transporter.sendMail({
      from: `"ProShop" <${process.env.SMTP_USER}>`,
      to: user.email,
      subject: "Email Verification OTP",
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Hello ${user.name}!</h2>
          <p style="font-size: 16px;">Your verification code is:</p>
          <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px;">
            ${otpCode}
          </div>
          <p style="color: #666; margin-top: 20px;">This code will expire in 10 minutes.</p>
          <p style="color: #999; font-size: 12px;">If you didn't request this, please ignore this email.</p>
        </div>
      `,
    });
    // console.log(`OTP email sent to ${user.email}:`, info.messageId);?
    return { success: true, messageId: info.messageId };
  } catch (error) {
    throw new Error("Failed to send verification email");
  }
};
