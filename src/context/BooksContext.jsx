import axios from 'axios';
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { AuthContext } from './AuthContext';
import { buildApiUrl, ENDPOINTS, REQUEST_CONFIG } from '../config/config';

//* the first thing is to create the context 
export const BooksContext = createContext();

const BooksContextProvider = ({children}) => {

    const {user} = useContext(AuthContext);

    const [ books, setBooks ] = useState([]);
    const [ error, setError ] = useState(null);

    const fetchBooks = useCallback(async() => {
        try {
            const response = await axios.get(buildApiUrl(ENDPOINTS.BOOKS), {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                },
                timeout: REQUEST_CONFIG.TIMEOUT
            });
            // console.log(response);

            setBooks(response.data);
            setError(null); // Clear any previous errors
        } catch (error) {
            console.error('Error fetching books:', error);
            setError(error.response?.data?.message || 'Failed to fetch books');
        }
    }, [user]);

    useEffect(() => {
        if(user) {
            fetchBooks();
        }
    }, [user, fetchBooks]);

  return (
    <BooksContext.Provider 
        value={{ 
            books,
            error,
        }}
    >
        {children}
    </BooksContext.Provider>
  )
}

export default BooksContextProvider;