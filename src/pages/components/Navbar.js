import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { RxHamburgerMenu, RxCross1 } from 'react-icons/rx';
import SocialMedia from './SocialMedia';
import { motion as m } from "framer-motion"
import { IoMdArrowDropdown } from 'react-icons/Io';


function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };



  return (
    <>
      {/* FULL MENU */}
      <ul className="md:flex text-md space-x-6 hidden text-md font-SourceSansPro font-semibold">
        <li className="">
          <Link className="flex items-center gap-1" href="" as=""><IoMdArrowDropdown />Entreprenad</Link>
        </li>
        <li className="">
        <Link className="flex items-center gap-1" href="" as=""><IoMdArrowDropdown />Lantbruk</Link>
        </li>
        <li className="">
        <Link className="flex items-center gap-1" href="" as=""><IoMdArrowDropdown />Grönyta</Link>
        </li>
      </ul>
      {/* HAMBURGER MENU */}
      <div ref={menuRef} className="md:hidden">
        {menuOpen ? (
          <RxCross1
            onClick={toggleMenu}
            className="text-3xl relative z-10 cursor-pointer"
          />
        ) : (
          <RxHamburgerMenu
            onClick={toggleMenu}
            className="text-3xl cursor-pointer"
          />
        )}
        {menuOpen && (
          <m.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          duration={0.5}
          className='absolute bg-white top-0 left-[-100px] right-[-100px] buttom-0 text-2xl h-screen overflow-hidden'
          >
            <ul className="flex flex-col space-y-6 justify-center h-screen items-center overflow-hidden">
              <li className="hover:underline decoration-2 underline-offset-4"
              onClick={handleMenuItemClick}
              >
                <Link href="/works" as="/works">Works</Link>
              </li>
              <li className="hover:underline decoration-2 underline-offset-4"
              onClick={handleMenuItemClick}
              >
                <Link href="/texts" as="/texts">Texts</Link>
              </li>
              <li className="hover:underline decoration-2 underline-offset-4"
              onClick={handleMenuItemClick}
              >
                <Link href="/biography">Biography</Link>
              </li>
              <li className="pt-20"
              onClick={handleMenuItemClick}>
                <SocialMedia />
              </li>
            </ul>
          </m.div>
        )}
      </div>
    </>
  );
}

export default Navbar;
