import React from 'react'
import Link from 'next/link'

const BottomBar = () => {
  return (
  <div className="flex justify-around w-full px-4 py-2 bg-gray-900">
      <Link href="/PrivacyPolicy">Privacy Policy</Link>
      <Link href="/TermsandConditions">Terms and Conditions</Link>
      <Link href="/Accessibility">Accessibility</Link>
    </div>
  )
}

export default BottomBar
