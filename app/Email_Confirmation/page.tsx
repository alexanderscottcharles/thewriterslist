import React from 'react'
import NavBar from '../components/NavBar'

const Page = () => {
  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md text-gray-800 space-y-6">
      <NavBar />
      <h1 className="text-2xl font-bold text-green-700">Please check your email!</h1>
      <p>We've sent you a confirmation email. Make sure to confirm your email address to activate your account.</p>

      <div className="bg-green-50 p-4 rounded-md border border-green-200">
        <h2 className="text-lg font-semibold mb-2">Refer others and earn free credits:</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li><strong>Novelists:</strong> 1 novel credit</li>
          <li><strong>Screenwriters:</strong> 3 screenplay credits</li>
          <li><strong>Working professionals:</strong> 1 month free access</li>
        </ul>
        <p className="mt-3 text-sm text-gray-600">
          Per person who signs up and logs in to use the platform upon release.
        </p>
      </div>
    </div>
  )
}

export default Page
