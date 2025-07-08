import React from 'react'
import Link from 'next/link'

const NavBar = () => {
  return (
    <div className="flex items-center w-full px-4 py-2 bg-black">
      <Link href="/" className="flex flex-col md:flex-row items-center">
        <p className="font-playfair text-green-500 text-3xl">The Writer's List</p>
        <p className="text-white text-xs md:text-base pl-4 px-1">
          The only website by writers, for writers
        </p>
      </Link>
    </div>
  )
}

export default NavBar
