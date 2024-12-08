import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';

const BooksByGenre = () => {

    const { user } = useContext(AuthContext);

    const { genre } = useParams();

    const [ books, setBooks ] = useState([]);


    const fetchBooksByGenre = async() => {
        try {
            const response = await axios.get(`https://book-store-api-9hck.onrender.com/books/genre/${genre}`, {
                headers: {'Authorization': `Bearer ${user.token}`}
            });
            const data = await response.data;
            const { booksByGenre } = data;

            setBooks(booksByGenre);
        } catch (error) {
            console.error('Error While Fetching Books', error);
        }
    }

    useEffect(() => {
        if(user) {
            fetchBooksByGenre();
        }
    }, [user]);

  return (
    <div className='bg-gray-100 min-h-screen py-10'>
      <div className='container mx-auto px-[2rem] sm:px-[3rem] md:px-[4rem] lg:px-[5rem] xl:px-[6rem]'>
        <h1 className='text-xl sm:text-[1.5rem] md:text-[1.6rem] lg:text-[1.8rem] font-bold text-gray-800 mb-[2rem]'>{genre} Books</h1>
        {books && books.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[2rem]'>
            {books && books.map((book) => (
              <div key={book._id}
                className='bg-orange-50 rounded-lg shadow-lg overflow-hidden flex flex-col '
              >
                <Link to={`/books/${book._id}`}>
                  <img 
                    src={book.img} 
                    alt={book.title}
                    className='h-[400px] w-full object-fill' 
                  />
                </Link>
                <div className='px-4 py-[1rem] flex flex-col justify-between flex-grow'>
                  <h2 className='text-[1.2rem] py-[1.2rem]' title={book.title}>
                    {
                      book.title.length > 20 ? `${book.title.slice(0,20)}...`  : book.title
                    }
                  </h2>
                  <p className='italic text-sm'>by {book.author}</p>
                  <div className='py-[1rem]'>
                    <span className='text-green-700 font-semibold'>{book.price}$</span>
                    <span className='line-through align-super ml-[5px] text-red-600 italic'>{book.oldPrice}$</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ): (
          <div>
            No Book is Available
          </div>
        )}
      </div>
    </div>
  )
}

export default BooksByGenre