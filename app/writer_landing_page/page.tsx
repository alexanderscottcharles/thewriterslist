'use client'

import { useSearchParams } from 'next/navigation'
import copy from 'copy-to-clipboard'
import { useState } from 'react'

export default function EmailConfirmedPage() {
  const uuid = useSearchParams().get('uuid')
  const [copied, setCopied] = useState(false)
  const [sending, setSending] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const referralLink = uuid
    ? `https://thewriterslist.com/signup?referrer=${uuid}`
    : null

  const handleCopy = () => {
    if (referralLink) {
      copy(referralLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const sendReferralEmail = async () => {
    if (!uuid) return
    setSending(true)
    setError(null)
    try {
      const res = await fetch('/api/sendReferral', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uuid }),
      })

          // Try to parse JSON only if response is not empty
    let data = null
    const text = await res.text()
    try {
      data = text ? JSON.parse(text) : null
    } catch {
      // invalid JSON, data remains null
    }
     
      if (!res.ok) throw new Error(data.error || 'Failed to send email')
        
      setEmailSent(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">✅ Email Confirmed!</h1>
      <p className="mb-4 text-gray-700">
        Thanks for confirming your email! Here's your personal referral link:
      </p>

      {referralLink ? (
        <>
          <div className="bg-gray-100 p-3 rounded mb-4 text-sm font-mono break-all">
            {referralLink}
          </div>

          <button
            onClick={handleCopy}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded mr-4"
          >
            {copied ? 'Copied!' : 'Copy your referral link'}
          </button>

          <button
            onClick={sendReferralEmail}
            disabled={sending || emailSent}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            {sending ? 'Sending...' : emailSent ? 'Referral Email Sent' : 'Email me my referral link'}
          </button>

          {error && <p className="text-red-500 mt-2">{error}</p>}
        </>
      ) : (
        <p className="text-red-500">Missing referral ID.</p>
      )}
    </div>
  )
}
