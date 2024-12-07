
import React, { useContext, useState } from 'react'
import {navLinks} from '../constants/constants'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { FaBars, FaTimes } from 'react-icons/fa'

const Navbar = () => { 

    const [menuOpen, setMenuOpen] = useState(false);

    const { logOut, user } = useContext(AuthContext);
    
    const handleLogOut = () => {
        logOut();
    }

  return (
    <div>
        <nav className='px-4 sm:px-6 lg:px-8 xl:px-[6.2rem] 2xl:px-32 bg-slate-200 flex justify-between py-[2rem] '>
            <Link to='/'>
                <h1 className='font-bold text-[1.4rem] text-orange-600'>
                    Books Store
                </h1>
            </Link>

            <div>
                <ul className={`lg:flex gap-8 ${ menuOpen ? 'flex': 'hidden'}`}>
                    {navLinks.map((e,i)=>(
                        <li key={i}>
                            <Link to={e.href} className='text-gray-600 inline-block hover:font-semibold min-w-[30px] 
                            transition-transform duration-150'>{e.text}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            {user && (
                <div>
                    <ul>
                        <li>
                            <button onClick={handleLogOut}>Log out</button>
                        </li>
                    </ul>
                </div>
            )}
         <button
                className='block md:hidden font-medium' 
                onClick={() => setMenuOpen(!menuOpen)}
            >
                {menuOpen ? <FaTimes /> : <FaBars />}
            </button>  
        </nav>

    </div>
  )
}

export default Navbar