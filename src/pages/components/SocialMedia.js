import React from 'react'
import Link from 'next/link'
import { BsTwitter, BsDiscord } from 'react-icons/bs';
import { AiFillInstagram } from 'react-icons/ai';


function SocialMedia() {
  return (
    <div className='flex gap-3 text-blueOne-500'>
        <Link href='https://twitter.com/PARKLEE_ART' target="_blank" alt="twitter">
          <BsTwitter className='text-2xl' />
        </Link>
        <Link href='https://www.instagram.com/parklee_art' target="_blank" alt="instagram">
          <AiFillInstagram className='text-2xl' />
        </Link>
        {/* <Link href='/' target="_blank" alt="discord">
          <BsDiscord className='text-2xl' />
        </Link> */}
    </div>
  )
}

export default SocialMedia