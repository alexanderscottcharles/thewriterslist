import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      specTitle,
      logline,
      writers,
      submitterEmail,
      submitterFirstName,
      submitterLastName
      // etc.
    } = body

    // Validate required fields here

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD
      }
    })

    const mailOptions = {
      from: `"Spec Tracking Form" <${process.env.SMTP_EMAIL}>`,
      to: 'info@thewriterslist.com',
      subject: `New Spec Script Submission: ${specTitle}`,
      text: `
Title: ${specTitle}
Logline: ${logline}
Writers: ${writers}
Submitted by: ${submitterFirstName} ${submitterLastName}
Email: ${submitterEmail}
      `
    }

    await transporter.sendMail(mailOptions)
    return NextResponse.json({ message: 'Submission sent successfully.' })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 })
  }
}
