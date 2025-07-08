'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { confirmEmail, sendReferralEmail } from '../lib/actions'
import copy from 'copy-to-clipboard'

export default function ConfirmPage() {
  const searchParams = useSearchParams()
  const uuid = searchParams.get('uuid')

  const [confirmed, setConfirmed] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)

  useEffect(() => {
    if (!uuid) return

    ;(async () => {
      try {
        const userInfo = await confirmEmail(uuid)
        setUser(userInfo)
        setConfirmed(true)
      } catch (e) {
        console.error(e)
        setError('Could not confirm your email.')
      }
    })()
  }, [uuid])

  const handleResendReferral = async () => {
    if (!uuid) return
    try {
      await sendReferralEmail(uuid)
      alert('Referral email sent!')
    } catch (e) {
      console.error(e)
      alert('Could not send referral email.')
    }
  }

  const handleCopyLink = () => {
    if (!uuid) return
    const link = `https://yourapp.com/signup?referrer=${uuid}`
    copy(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="p-4">
      {confirmed ? (
        <>
          <h1 className="text-xl font-bold">Email Confirmed!</h1>
          {user && (
            <p className="mt-2">
              Thanks for confirming your email, {user.name}! <br />
              We have you as <strong>{user.email}</strong>.
            </p>
          )}
          <p className="mt-4">
            Get one free month for every person who signs up and uses the app once
          </p>
          <div className="mt-4 space-x-2">
            <button
              onClick={handleResendReferral}
              className="bg-blue-500 p-2 rounded text-white"
            >
              Email me my referral link
            </button>
            <button
              onClick={handleCopyLink}
              className="bg-green-500 p-2 rounded text-white"
            >
              {copied ? 'Copied!' : 'Copy referral signup link'}
            </button>
          </div>
        </>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <p>Confirming...</p>
      )}
    </div>
  )
}
