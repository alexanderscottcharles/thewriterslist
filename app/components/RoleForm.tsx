"use client"

import React, { useState } from "react"
import { RoleSelector } from "./DropDown"
import { submit } from "../lib/actions"
import { useRouter } from "next/navigation"

export default function RoleForm() {
  const router = useRouter()
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
      router.replace("/Email_Confirmation")
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-xl shadow-md"
    >
      {/* NAME FIELD */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Enter your full name"
          defaultValue={values.name}
          required
          className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        {errors.name && (
          <p className="text-red-600 text-sm mt-1">{errors.name.join(", ")}</p>
        )}
      </div>

      {/* EMAIL FIELD */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          defaultValue={values.email}
          required
          className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email.join(", ")}</p>
        )}
      </div>

      {/* ROLE SELECTOR */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 my-2">
          Select your role
        </label>
        <RoleSelector />
        {errors.title && (
          <p className="text-red-600 text-sm mt-1">{errors.title.join(", ")}</p>
        )}
      </div>

      {/* SUBMIT BUTTON & GENERAL ERRORS */}
      {errors.general && (
        <p className="text-red-600 text-sm" aria-live="polite">
          {errors.general.join(", ")}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200 disabled:opacity-50"
      >
        {pending ? "Submitting..." : "Submit"}
      </button>
    </form>
  )
}
