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

    return { success: true }
  } catch (err) {
    console.error('Unexpected error:', err)
    return {
      errors: { general: ['Could not save to database'] },
      values: formValues,
    }
  }
}
