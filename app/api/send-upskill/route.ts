import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, country } = body;

    if (!firstName || !email || !phone || !country) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS, // 👈 no spaces
      },
    });

    await transporter.sendMail({
      from: `" Form" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER, // admin mail
      subject: " Form Submission",
      html: `
        <h3>New Lead Received</h3>
        <p><b>Name:</b> ${firstName} ${lastName || ""}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Country:</b> ${country}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("SMTP Error:", error);
    return NextResponse.json(
      { success: false, message: "Email failed" },
      { status: 500 }
    );
  }
}
