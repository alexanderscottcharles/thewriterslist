'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { RoleSelector } from '../components/DropDown'
import { submit } from '../lib/actions'

export default function RoleForm() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [errors, setErrors] = useState<Record<string, string[]>>({})
  const [referrer, setReferrer] = useState<string | null>(null)
  const [values, setValues] = useState({
    title: '',
    name: '',
    email: '',
  })
  const [pending, setPending] = useState(false)

  useEffect(() => {
    const ref = searchParams.get('referrer')
    if (ref) {
      setReferrer(ref)
    }
  }, [searchParams])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPending(true)

    const formData = new FormData(event.currentTarget)

    if (referrer) {
      formData.append('referredBy', referrer)
    }

    const result = await submit(null, formData)
    setPending(false)

    if ('errors' in result) {
      setErrors(result.errors)
      setValues({
        title: formData.get('title') as string,
        name: formData.get('name') as string,
        email: formData.get('email') as string,
      })
    } else {
      setErrors({})
      setValues({ title: '', name: '', email: '' })
      alert('Submitted successfully!')
      router.replace('/Email_Confirmation')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Name"
          defaultValue={values.name}
          required
        />
        {errors.name && <p aria-live="polite">{errors.name.join(', ')}</p>}
      </fieldset>

      <fieldset>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          defaultValue={values.email}
          required
        />
        {errors.email && <p aria-live="polite">{errors.email.join(', ')}</p>}
      </fieldset>

      <fieldset>
        <RoleSelector />
      </fieldset>

      <button type="submit" disabled={pending}>
        {errors.general && (
          <p className="text-red-500 mb-4" aria-live="polite">
            {errors.general.join(', ')}
          </p>
        )}
        {pending ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  )
}
