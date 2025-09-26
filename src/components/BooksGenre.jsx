import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { booksGenreCollection } from '../constants/constants';

const BooksGenre = ({title}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='py-20 bg-slate-50 relative overflow-hidden'>
      {/* Background Pattern */}
      <div className='absolute inset-0 opacity-5'>
        <div className='absolute top-10 right-10 w-40 h-40 bg-blue-600 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-10 left-10 w-32 h-32 bg-purple-600 rounded-full blur-3xl animate-bounce'></div>
      </div>
      
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <div className='text-center mb-16'>
          <h2 className={`text-3xl md:text-4xl font-bold text-slate-800 mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {title}
          </h2>
          <div className={`w-24 h-1 bg-blue-600 mx-auto rounded-full transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}></div>
          <p className={`text-xl text-slate-600 mt-6 max-w-2xl mx-auto transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Découvrez notre collection organisée par genres pour trouver facilement votre prochaine lecture
          </p>
        </div>
        
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {booksGenreCollection.map((item, index) => (
            <Link
              to={item.href}
              key={index}
              className='group'
            >
              <div className={`relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 transform group-hover:-translate-y-2 group-hover:scale-105 animate-fade-in-up`} 
                   style={{animationDelay: `${index * 0.2}s`}}>
                <div className='aspect-[4/5] relative overflow-hidden'>
                  <img
                    src={item.img}
                    className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700'
                    alt={item.alt}
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                  
                  {/* Floating Elements */}
                  <div className='absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:animate-bounce'>
                    <span className='text-white text-sm'>📚</span>
                  </div>
                </div>
                
                <div className='absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500'>
                  <h3 className='text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors duration-300'>{item.label}</h3>
                  <p className='text-slate-600 text-sm group-hover:text-slate-800 transition-colors duration-300'>
                    Découvrez notre sélection de livres {item.label.toLowerCase()}
                  </p>
                  <div className='flex items-center mt-3 text-blue-600 font-medium group-hover:text-blue-700 transition-colors duration-300'>
                    <span>Explorer le genre</span>
                    <svg className='w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                    </svg>
                  </div>
                </div>
                
                {/* Hover Effect Overlay */}
                <div className='absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl'></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BooksGenre;
