import { NextResponse } from "next/server";
import supabase from "../../../utils/supabase/server"; 
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { uuid } = await request.json();

    if (!uuid) {
      return NextResponse.json({ error: "Missing uuid" }, { status: 400 });
    }

    // Fetch user info from Supabase
    const { data: user, error: fetchError } = await supabase
      .from("submissions") // or "users" depending on your schema
      .select("name, email")
      .eq("id", uuid)
      .single();

    if (fetchError || !user) {
      console.error("User fetch error:", fetchError);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const referralLink = `https://thewriterslist.com/signup?referrer=${uuid}`;

    // Send the email with Resend
    await resend.emails.send({
      from: "The Writers List <info@thewriterslist.com>",
      to: [user.email],
      subject: "Your Referral Link",
      html: `
        <p>Hi ${user.name},</p>
        <p>Here’s your personal referral link:</p>
        <p><a href="${referralLink}">${referralLink}</a></p>
        <p>Thanks for sharing!</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send referral email:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
