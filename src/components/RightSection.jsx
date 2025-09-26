import React, { useContext } from 'react'
import { loginLinks, navLinks } from '../constants/constants'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';

const RightSection = () => {
    const {user, logOut} = useContext(AuthContext);
    const { getFavoritesCount } = useFavorites();
    const { getCartItemsCount } = useCart();

    const handleLogOut = () => {
        logOut();
    }

  return (
    <div className=''>
        <ul className='flex gap-6 items-center'>
            {navLinks.map((e,i)=>(
                <li key={i}>
                    <Link to={e.href} className='text-gray-600 inline-block hover:text-blue-600 min-w-[30px] 
                    transition-colors duration-300 cursor-pointer relative'>
                        {e.text}
                        {e.text === 'Favoris' && getFavoritesCount() > 0 && (
                            <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
                                {getFavoritesCount()}
                            </span>
                        )}
                    </Link>
                </li>
            ))}

            {/* Panier */}
            <li>
                <Link 
                    to="/checkout" 
                    className='text-gray-600 inline-block hover:text-blue-600 min-w-[30px] 
                    transition-colors duration-300 cursor-pointer relative'
                >
                    <FaShoppingCart />
                    {getCartItemsCount() > 0 && (
                        <span className='absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
                            {getCartItemsCount()}
                        </span>
                    )}
                </Link>
            </li>

            {!user ?  (
                <div className='flex gap-6'>
                    {loginLinks.map((link, index) => (
                        <li
                            key={index}
                            className=''
                        >
                    <Link to={link.href} className='text-gray-600 inline-block hover:text-blue-600 min-w-[30px] 
                            transition-colors duration-300 cursor-pointer'>{link.text}</Link>
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