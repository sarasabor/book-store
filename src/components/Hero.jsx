import React from 'react'
import coverImage from '../images/coverPhoto.jpg';
import BooksGenre from './BooksGenre';
import { Link } from 'react-router-dom';


const Hero = () => {

  return (
    <div>

      {/* Main Image */}
        <div className='relative bg-gray-100 '>
            <img src={coverImage} alt="cover" 
              className='w-full h-[calc(100vh-4rem)] object-cover sm:h-[60vh] md:h-[70vh] lg:h-[80vh]' 
            />
            {/* text  */}
            <div 
              className='absolute top-[20%] left-[5%] sm:left-[10%] md:left-[13%] lg:left-[16%] p-3 
              w-[50%] sm:w-[50%] md:w-[40%] lg:w-[30%]'
            >
                <h1 className='text-[2.5rem] sm:text-[2.8rem] md:text-[3rem] font-bold mb-2 '>Welcome To Our 
                    <span className='text-orange-600'> WebStore</span>
                </h1>
                <button 
                  className='border-2 border-orange-600 p-2 font-semibold text-gray-800 text-sm mt-2'
                >
                  <Link to="/books">Shop now</Link>
                </button>
            </div>
        </div> 
        <BooksGenre title='Books Genre'/>
       
    </div>
  )
};

export default Hero; 