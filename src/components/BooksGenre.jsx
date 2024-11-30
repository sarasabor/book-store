import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { BooksContext } from '../context/BooksContext'
import { booksGenreCollection } from '../constants/constants';

const BooksGenre = ({title}) => {

  return (
    <div className='px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-32 mt-[5rem] '>
        <h1 className='text-[1.5rem] sm:text-[2rem] text-gray-950 font-medium '>{title}</h1>
         <div className='flex justify-center flex-wrap gap-y-[8rem] gap-x-[3rem] mt-[2rem]'>
         {booksGenreCollection.map((item, index) => (
          <Link
            to={item.href}
            key={index}
          >
            <div className='h-[400px] w-[300px] relative hover:scale-[1.02] '>
              <img
                src={item.img}
                className='h-[500px] w-[400px] absolute inset-0 object-cover rounded-lg  transition duration-[.3s]'
                alt={item.alt}
              />
              <div 
                className='absolute text-gray-800 bottom-0 flex justify-center items-center w-full bg-white/80
                p-5 font-semibold'
              >
                <h1 className='text-[1.1rem]'>{item.label}</h1>
              </div>
            </div>
          </Link>
         ))}
         </div>
    </div>
  )
}

export default BooksGenre;
