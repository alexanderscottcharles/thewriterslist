"use client"

import React, { useState } from "react"
import { RoleSelector } from "./DropDown"
import { submit } from "../lib/actions"
import { redirect, RedirectType } from 'next/navigation'

export default function RoleForm() {
  const [errors, setErrors] = useState<Record<string, string[]>>({})
  const [values, setValues] = useState({
    title: "",
    name: "",
    email: "",
  })
  const [pending, setPending] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPending(true)

    const formData = new FormData(event.currentTarget)
    console.log("formData contents", Object.fromEntries(formData))

    const result = await submit(null, formData)
    setPending(false)

    if ("errors" in result) {
      setErrors(result.errors)
      setValues({
        title: formData.get("title") as string,
        name: formData.get("name") as string,
        email: formData.get("email") as string,
      })
    } else {
      setErrors({})
      setValues({ title: "", name: "", email: "" })
      alert("Submitted successfully!")
      redirect('/Email_Confirmation', RedirectType.replace)
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
        {errors.name && <p aria-live="polite">{errors.name.join(", ")}</p>}
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
        {errors.email && <p aria-live="polite">{errors.email.join(", ")}</p>}
      </fieldset>

      <fieldset>
        {/* role selector now manages its own state and provides the hidden input */}
        <RoleSelector />
      </fieldset>

      <button type="submit" disabled={pending}>
        {pending ? "Submitting..." : "Submit"}
      </button>
    </form>
  )
}
