import React from 'react'
import MobileMenu from './MobileMenu'
import LeftSection from './LeftSection'
import RightSection from './RightSection'

const Navbar = () => {
  return (
    <div className='px-4 sm:px-6 lg:px-8 xl:px-[6.2rem] 2xl:px-32 bg-slate-200 flex justify-between py-[2rem]'>
        
        {/* Mobile Section */}
        <section className="md:hidden w-full ">
            <MobileMenu />
        </section>

        {/* Desktop Screens */}
        <section className='hidden md:flex justify-between items-center w-full'>
            {/* LEFT SECTION */}
            <section className=''>
                <LeftSection />
            </section>

            {/* RIGHT SECTION */}
            <section className=''>
                <RightSection />
            </section>
        </section>
    </div>
  )
}

export default Navbar