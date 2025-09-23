import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';
import { buildApiUrl, REQUEST_CONFIG } from '../config/config';

const BooksByGenre = () => {

    const { user } = useContext(AuthContext);

    const { genre } = useParams();

    const [ books, setBooks ] = useState([]);
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(false);

    const fetchBooksByGenre = async() => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(buildApiUrl(`/books/genre/${genre}`), {
                headers: {'Authorization': `Bearer ${user.token}`},
                timeout: REQUEST_CONFIG.TIMEOUT
            });
            const data = await response.data;
            const { booksByGenre } = data;

            setBooks(booksByGenre);
        } catch (error) {
            console.error('Error While Fetching Books', error);
            setError(error.response?.data?.message || 'Failed to fetch books by genre');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user) {
            fetchBooksByGenre();
        }
    }, [user, genre]);

  return (
    <div className='bg-gray-100 min-h-screen py-10'>
      <div className='container mx-auto px-[2rem] sm:px-[3rem] md:px-[4rem] lg:px-[5rem] xl:px-[6rem]'>
        <h1 className='text-xl sm:text-[1.5rem] md:text-[1.6rem] lg:text-[1.8rem] font-bold text-gray-800 mb-[2rem]'>{genre} Books</h1>
        
        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
            <span className="ml-2 text-gray-600">Loading books...</span>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-800">{error}</p>
            <button 
              onClick={fetchBooksByGenre}
              className="mt-2 bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded text-sm"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && books && books.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[2rem]'>
            {books.map((book) => (
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
        ): !loading && !error && (
          <div className="text-center py-8">
            <p className="text-gray-600">No books available for this genre.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default BooksByGenre