import axios from 'axios'
import React, { useContext, useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { buildApiUrl, REQUEST_CONFIG } from '../config/config'

const GetBookById = () => {

  const { user } = useContext(AuthContext);

  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState('');
  const [error, setError] = useState('');

  const fetchBook = useCallback(async() => {
    setLoading(true); //* Start Loading
    try {
      const res = await axios.get(buildApiUrl(`/books/${id}`), { 
        headers: {
          'Authorization': `Bearer ${user.token}`
        },
        timeout: REQUEST_CONFIG.TIMEOUT
      });
      const { data } = res;
      setBook(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, [user, id]);

  useEffect(() => {
    if(user) {
      fetchBook();
    }
  }, [user, fetchBook]);
    
  return (
    <div className='container mx-auto p-[12px]'>
      {loading && <p className='text-lg font-bold text-gray-600 flex justify-center'>Loading ...</p>}
      {error && <p className='text-lg font-bold text-red-600 flex justify-center'>Error loading book</p>}
        <div className='flex flex-col md:flex-row items-center md:items-start gap-8'>
        <img 
          src={book.img}
          alt={book.title}
          className='w-full md:w-1/2 shadow-lg rounded'
        /> 
        <div className='w-[80%] md:w-1/2 space-y-2 max-sm:text-center '>
          <h1 className='text-2xl font-bold text-orange-600'>{book.title}</h1>
          <p className='text-sm  italic font-semibold text-gray-600 '>{book.author}</p>
          <p className='text-gray-700 mt-4 w-[90%] md:w-[80%]'>{book.description}</p>
        </div>
      </div>
    </div>
  )
}

export default GetBookById