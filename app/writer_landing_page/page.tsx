'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
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
        const res = await fetch(`/api/confirm-email?uuid=${uuid}`)
        if (!res.ok) throw new Error('Confirmation failed')
        const userInfo = await res.json()
        setUser(userInfo)
        setConfirmed(true)
      } catch (e) {
        console.error(e)
        setError('Could not confirm your email.')
      }
    })()
  }, [uuid])

  const handleCopyLink = () => {
    if (!uuid) return
    const link = `https://thewriterslist.com/signup?referrer=${uuid}`
    copy(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md">
      {confirmed ? (
        <>
          <h1 className="text-2xl font-bold mb-2">🎉 Email Confirmed!</h1>
          {user && (
            <p className="text-gray-700 mb-4">
              Thanks for confirming your email, <strong>{user.name}</strong>!
              <br />
              We have you as <strong>{user.email}</strong>.
            </p>
          )}

          <h2 className="text-lg font-semibold mb-1">Refer friends for free credits:</h2>
          <ul className="list-disc ml-6 mb-4 text-gray-700">
            <li>Screenwriters: 3 screenplay credits</li>
            <li>Novelists: 1 novel credit</li>
            <li>Professionals: 1 month free access</li>
          </ul>

          <button
            onClick={handleCopyLink}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition"
          >
            {copied ? '✅ Copied!' : 'Copy your referral link'}
          </button>
        </>
      ) : error ? (
        <p className="text-red-600 font-medium">{error}</p>
      ) : (
        <p className="text-gray-500 italic">Confirming your email...</p>
      )}
    </div>
  )
}
