'use client'

import React, {useState } from 'react'
import Link from 'next/link'
import { MenuIcon, XIcon } from 'lucide-react'


const Navbar = () => {
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  // Array containing navigation items
  const navItems = [
    { id: 1, text: 'TrackingBoard' },
   
    
  ];

  return (
    <div className='bg-black '><div className="flex flex-row justify-between items-center h-24  mx-auto px-4 text-white">
      {/* Logo */}<div className='flex flex-col md:flex-row items-center'>
      <p className='text-3xl font-playfair text-green-500'>The Writer's List</p>
      <p className="text-white md:pl-4 text-sm md:text-base">
        The Only Website By Writers, for Writers.
      </p>
    </div>
      {/* Desktop Navigation */}
      <div className='hidden md:flex'>
        {navItems.map(item => (
          <p
            key={item.id}
            className='p-4 hover:bg-green-500 rounded-xl m-2 mr-10 cursor-pointer duration-300 hover:text-black'
          >
          <Link href={item.text.toLowerCase().trim()}>
  {item.text}
</Link>

          </p>
        ))}
      </div>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className='block md:hidden'>
        {nav ? <XIcon size={20} /> : <MenuIcon size={20} />}
      </div>

      {/* Mobile Navigation Menu */}
     <ul
  className={
    nav
      ? 'fixed md:hidden left-0 top-0 w-[75%] h-full bg-[#000300] flex flex-col p-6 space-y-4 z-50'
      : 'fixed top-0 left-[-100%] h-full w-[75%] bg-[#000300] flex flex-col p-6 space-y-4 z-50'
  }
>
  {/* Mobile Logo */}
  <h1 className='text-2xl font-playfair text-green-500'>The Writer&apos;s List</h1>

  {/* Mobile Navigation Items */}
  {navItems.map(item => (
    <li
      key={item.id}
      className='p-4 rounded-xl hover:bg-green-500 duration-300 hover:text-black cursor-pointer'
    >
      <Link href={item.text.toLowerCase().trim()} onClick={() => setNav(false)}>
        {item.text}
      </Link>
    </li>
  ))}
</ul>
    </div>
    </div>
  );
};

export default Navbar;