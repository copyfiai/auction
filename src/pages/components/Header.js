import React from 'react'
import Navbar from './Navbar'
import Link from 'next/link'
import Image from 'next/image'
import { GoQuestion } from 'react-icons/go';
import { GrContact } from 'react-icons/gr';
import { BiLogIn } from 'react-icons/bi';
import { IoSearch } from 'react-icons/io5';



function Header() {
  return (
    <main className='font-SourceSansPro'>
      {/* first */}
      <div className='md:flex hidden justify-between h-10 items-center bg-gray-100 px-20'>
        <div className='flex gap-5'>

          <div className='text-sm font-semibold flex items-center gap-1'><GrContact />Kontakta oss</div>
          <div className='text-sm font-semibold flex items-center gap-1'><GoQuestion />Frågor & Svar</div>
        </div>
        <div className='flex'>
          <Link className='text-md text-blueOne-500 font-bold flex items-center gap-1' href="/logga-in"><BiLogIn />Logga in</Link>
        </div>
      </div>
      {/* second */}
      <div className=' bg-blueTwo-500 text-white'>
        <div className='md:px-20 md:w-full w-5/6 flex justify-between h-24 items-center m-auto z-10 relative'>
          <div className='w-40'>
              <Link className='z-10 relative' href='/'>
                  <Image src='/logo/logo-white.svg' alt='parklee-logo' width={250} height={78} />
              </Link>
            </div>
          <nav>
              <Navbar />
          </nav>
          </div>
      </div>
      {/* third */}
      <div className='h-20 bg-gray-100 md:flex hidden justify-between items-center px-20'>
        <div className='flex items-center gap-2'>
          <input className='border-2 border-blueTwo-500 px-5 py-2 rounded-full font-SourceSansPro font-semibold placeholder-gray-600 focus:outline-none w-72' type='text' placeholder='Vad söker du?' />
          <IoSearch className='text-[25px] ml-[-50px] text-blueTwo-500'/>
        </div>
        <div>
          <button className='border-2 border-blueThree-500 text-blueThree-500 px-5 py-2 rounded-full font-SourceSansPro font-semibold hover:bg-blueThree-500 hover:text-white hover:ease-in-out duration-200'>Sälj på Smidigt</button>
        </div>
      </div>
    </main>
  )
}

export default Header