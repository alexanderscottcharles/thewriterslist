'use client'

import { useSearchParams } from 'next/navigation'
import copy from 'copy-to-clipboard'
import { useState } from 'react'

export default function EmailConfirmedPage() {
  const uuid = useSearchParams().get('uuid')
  const [copied, setCopied] = useState(false)

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
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
          >
            {copied ? 'Copied!' : 'Copy your referral link'}
          </button>
        </>
      ) : (
        <p className="text-red-500">Missing referral ID.</p>
      )}
    </div>
  )
}
