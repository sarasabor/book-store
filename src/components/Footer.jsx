import React from 'react'
import { Link } from 'react-router-dom'
import { customerServices, navLinks } from '../constants/constants'
import { FaInstagram, FaTiktok, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='bg-gray-800 text-slate-100 mt-[10rem] py-[4rem]'>
        <footer className='px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
            {/* LOGO AND DESCRIPTION */}
            <div>
              <Link to='/'>
                <h1 
                  className='text-3xl font-semibold text-orange-600'
                >Book Store</h1>
              </Link>
              <p
                className='mt-4 text-sm text-gray-300'
              >Welcome To Our online bookstore, offering a wide range of books from all genres.</p>
            </div>

            {/* Customer Services */}
            <div className=''>
              <h2 className='text-xl mb-3 text-gray-50 font-semibold'>Customer Services</h2>
              <ul>
                {customerServices && customerServices.map( (customer, index) => (
                  <li key={index}>
                    <Link 
                      to={customer.href}
                      className='text-gray-300 hover:text-orange-600 transition duration-[.5s] text-sm '
                    >
                      {customer.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* QUICK LINKS */}
            <div>
              <h2 className='text-xl mb-3 text-gray-50 font-semibold'>Quick Links</h2>
              <ul>
                {navLinks && navLinks.map( (link, index) => (
                  <li key={index}>
                  <Link 
                    to={link.href}
                    className='text-gray-300 hover:text-orange-600 transition duration-[.5s] text-sm '
                  >
                    {link.text}
                  </Link>
                </li>
                ))}
              </ul>
            </div>

            {/* FOLLOW US */}
            <div>
              <h2 className='text-xl mb-3 text-gray-50 font-semibold'>Social Links</h2>  
              <div className='flex gap-3 mt-4'>
                <a 
                  href="https://instagram.com"
                  className='text-gray-300 hover:text-orange-600 transition duration-[.5s] text-sm'
                  target='_blank'
                  rel="noreferrer"
                >
                  <FaInstagram size={30}/>
                </a>
                <a 
                  href="https://tiktok.com"
                  className='text-gray-300 hover:text-orange-600 transition duration-[.5s] text-sm'
                  target='_blank'
                  rel="noreferrer"
                >
                  <FaTiktok size={30}/>
                </a>
                <a 
                  href="https://twitter.com"
                  className='text-gray-300 hover:text-orange-600 transition duration-[.5s] text-sm'
                  target='_blank'
                  rel="noreferrer"
                >
                  <FaTwitter size={30}/>
                </a>
              </div>
            </div>
          </div>
        </footer>
    </div>
  )
}

export default Footer