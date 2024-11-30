
import React from 'react'
import {navLinks} from '../constants/constants'
import { Link } from 'react-router-dom'

const Navbar = () => {   
  return (
    <div>
        <nav className='px-4 sm:px-6 lg:px-8 xl:px-[6.2rem] 2xl:px-32 bg-slate-200 flex justify-between py-[2rem] '>
            <Link to='/'>
                <h1 className='font-bold text-[1.4rem] text-orange-600'>
                    Books Store
                </h1>
            </Link>
            <div>
                <ul className='decoration-solid flex gap-4'>
                    {navLinks.map((e,i)=>(
                        <li key={i}>
                            <Link to={e.href} className='text-gray-600 inline-block hover:font-semibold min-w-[30px] 
                            transition-transform duration-150'>{e.text}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>  
    </div>
  )
}

export default Navbar