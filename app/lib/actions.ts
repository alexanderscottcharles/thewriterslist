'use server'

import { z } from 'zod'
import supabase from '../utils/supabase/server'

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
  // check if this email is already in the submissions table
const { data: existing, error: fetchError } = await supabase
  .from('submissions')
  .select('id')
  .eq('email', parsed.data.email)
  .limit(1)
  .single();

    if (fetchError) {
      console.error('Supabase fetch error:', fetchError)
      return {
        errors: { general: [fetchError.message] },
        values: formValues,
      }
    }

    if (existing) {
      // already submitted
      return {
        errors: { email: ['You have already submitted this form.'] },
        values: formValues,
      }
    }

    const { error } = await supabase
      .from('submissions')
      .insert([
        {
          title: parsed.data.title,
          name: parsed.data.name,
          email: parsed.data.email,
        },
      ])

    if (error) {
      console.error('Supabase insert error:', error)
      return {
        errors: { general: [error.message] },
        values: formValues,
      }
    }
 const RESEND_API_KEY = process.env.RESEND_API_KEY

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Acme <onboarding@resend.dev>', // Change this to your verified sender
        to: [parsed.data.email],
        subject: 'Thank you for signing up!',
        html: `<p>Hi ${parsed.data.name},</p>
               <p>Thanks for signing up as a ${parsed.data.title}!</p>
               <p>We appreciate you joining us.</p>`,
      }),
    })

    if (!emailResponse.ok) {
      console.error('Failed to send confirmation email:', await emailResponse.text())
      // optionally handle or ignore email sending errors gracefully
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
