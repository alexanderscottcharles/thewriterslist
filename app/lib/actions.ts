'use server'

import { z } from 'zod'
import supabase from '../utils/supabase/server'
import { Resend } from "resend" 

const signupSchema = z.object({
  title: z.string().min(2).max(100),
  name: z.string().min(2).max(100),
  email: z.string().email(),
})

export async function submit(_: unknown, formData: FormData) {
  const formValues = {
    title: formData.get('title') as string,
    name: formData.get('name') as string,
    email: formData.get('email') as string,
  }

  const parsed = signupSchema.safeParse(formValues)

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
      values: formValues,
    }
  }

  try {
    // Check if email already exists
    const { data: existing, error: fetchError } = await supabase
      .from('submissions')
      .select('id')
      .eq('email', parsed.data.email)
      .limit(1)

    if (fetchError) {
      console.error('Supabase fetch error:', fetchError)
      return {
        errors: { general: [fetchError.message] },
        values: formValues,
      }
    }

    if (existing && existing.length > 0) {
      return {
        errors: { email: ['You have already submitted this form.'] },
        values: formValues,
      }
    }

    // Insert new submission
    const { error: insertError } = await supabase
      .from('submissions')
      .insert([
        {
          title: parsed.data.title,
          name: parsed.data.name,
          email: parsed.data.email,
        },
      ])

    if (insertError) {
      console.error('Supabase insert error:', insertError)
      return {
        errors: { general: [insertError.message] },
        values: formValues,
      }
    }

    // Send confirmation email via Resend
    const RESEND_API_KEY = process.env.RESEND_API_KEY
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'The Writers List <info@thewriterslist.com>', 
        to: [parsed.data.email],
        subject: 'Thank you for signing up!',
        html: `<p>Hi ${parsed.data.name},</p>
               <p>Thanks for signing up as a ${parsed.data.title}!</p>
               <p>We appreciate you joining us.</p>`,
      }),
    })

    if (!emailResponse.ok) {
      console.error('Failed to send confirmation email:', await emailResponse.text())
      // Optional: decide if this failure should block the form submission or not
    }

    return { success: true }
  } catch (err) {
    console.error('Unexpected error:', err)
    return {
      errors: { general: ['Could not save to database'] },
      values: formValues,
    }
  }
}


export async function confirmEmail(uuid: string) {
  // mark email confirmed
  const { error: updateError } = await supabase
    .from("users")
    .update({ email_confirmed: true })
    .eq("uuid", uuid);

  if (updateError) throw updateError;

  // fetch the user record
  const { data, error } = await supabase
    .from("users")
    .select("name, email")
    .eq("uuid", uuid)
    .single();

  if (error) throw error;

  return data; // { name, email }

}

export async function sendReferralEmail(uuid: string) {
  const referralLink = `https://thewriterslist.com/signup?referrer=${uuid}`;

  // Get user's email and name using the same method as confirmEmail
  const { data, error } = await supabase
    .from("users")
    .select("name, email")
    .eq("uuid", uuid)
    .single();

  if (error) {
    console.error("Failed to fetch user email for referral:", error);
    throw error;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: "The Writers List<info@thewriterslist.com>",
    to: [data.email],
    subject: "Share Your Referral Link!",
    html: `
      <p>Hi ${data.name},</p>
      <p>Share your unique referral link with friends:</p>
      <p><a href="${referralLink}">${referralLink}</a></p>
      <p>Thanks for helping us grow!</p>
    `,
  });
}



