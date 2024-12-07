import React, { useContext, useState } from 'react'
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { loginLinks, navLinks } from '../constants/constants';
import { AuthContext } from '../context/AuthContext';

const MobileMenu = () => {

    const { user, logOut } = useContext(AuthContext);

    const [menu, setMenu] = useState(false);

    const handleClick = () => {
        setMenu(prev => !prev)
    }

    const handleLogOut = () => {
        logOut();
    }

  return (
    <div className='flex justify-between items-center '>
        <div>
        <Link to='/'>
                <h1 className='font-bold text-[1.4rem] text-orange-600'>
                    Books Store
                </h1>
        </Link>

        </div>


    <div>
    <div>
        {/* Displaying The Icon */}
        <FaBars 
            onClick={handleClick}
            className='cursor-pointer h-[20px] w-[20px]'
        />
            {menu && (
                <ul 
                    className='absolute left-[178px] top-[5rem] text-gray-600 bg-white gap-2 
                    w-[calc(100%-29%)] flex flex-col h-full z-10 pl-[1.5rem] font-semibold space-y-[1rem]'
                >
                {navLinks.map((e,i)=>(
                    <li key={i} className='p-[6px] hover:text-orange-600 transition duration-[.5s]'>
                        <Link 
                            to={e.href} 
                            className='w-full'
                            onClick={handleClick}
                        >{e.text}</Link>
                    </li>
                ))}

                {/* LOGIN LINKS */}
                {!user ?  (
                <div className='flex gap-6 flex-col'>
                    {loginLinks.map((link, index) => (
                        <li
                            key={index}
                            className=''
                        >
                    <Link 
                        to={link.href} 
                        className='text-gray-600 inline-block hover:text-orange-600 min-w-[30px] 
                            transition-transform duration-150 cursor-pointer'
                        onClick={handleClick}
                        >{link.text}</Link>
                            </li>
                        ))}
                </div>
            ): (
                <div>
                     <button onClick={handleLogOut}>Log out</button>
                </div>
            )}
            </ul>
            )}
        </div>
    </div>
    </div>
  )
}

export default MobileMenu