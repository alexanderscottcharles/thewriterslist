'use server'

import { z } from 'zod'
import { prisma } from "../lib/prisma"

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


  const validatedData = parsed.data as {
    title: string
    name: string
    email: string
  }

  try {
    await prisma.submission.create({
      data: validatedData,
    })
    return { success: true }
  } catch (err) {
    console.error(err)
    return {
      errors: { general: ["Could not save to database"] },
      values: formValues,
    }
  }
}
