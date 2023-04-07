import React from 'react'
import SocialMedia from './SocialMedia';




function Footer() {

  const time = new Date().getFullYear()

  return (
    <main className='flex h-20 grow-0'>
      <div className='mt-auto bottom-0 w-full px-20 flex justify-between m-auto items-center'>
        <div>
           <p className='text-gray-500 text-sm'>© 2017 - {time} Smidigt. All rights reserved.</p>
        </div>
        <div className='hidden md:flex'> 
          <SocialMedia />
        </div>
      </div>
    </main>
  )
}

export default Footer