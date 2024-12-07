import React, { useContext } from 'react'
import { loginLinks, navLinks } from '../constants/constants'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';

const RightSection = () => {

    const {user, logOut} = useContext(AuthContext);

    const handleLogOut = () => {
        logOut();
    }

  return (
    <div className=''>
        <ul className='flex gap-6'>
            {navLinks.map((e,i)=>(
                <li key={i}>
                            <Link to={e.href} className='text-gray-600 inline-block hover:text-orange-600 min-w-[30px] 
                            transition-transform duration-150 cursor-pointer'>{e.text}</Link>
                </li>
            ))}

            {!user ?  (
                <div className='flex gap-6'>
                    {loginLinks.map((link, index) => (
                        <li
                            key={index}
                            className=''
                        >
                    <Link to={link.href} className='text-gray-600 inline-block hover:text-orange-600 min-w-[30px] 
                            transition-transform duration-150 cursor-pointer'>{link.text}</Link>
                            </li>
                        ))}
                </div>
            ): (
                <div>
                     <button onClick={handleLogOut}>Log out</button>
                </div>
            )}

            
        </ul>
    </div>
  )
}

export default RightSection