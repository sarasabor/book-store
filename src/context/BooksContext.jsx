import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { buildApiUrl, config } from '../config/config';

//* the first thing is to create the context 
export const BooksContext = createContext();

const BooksContextProvider = ({children}) => {

    const {user} = useContext(AuthContext);

    const [ books, setBooks ] = useState([]);
    const [ error, setError ] = useState(null);

    const fetchBooks = async() => {
        try {
            const response = await axios.get(buildApiUrl(config.ENDPOINTS.BOOKS), {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                },
                timeout: config.REQUEST_CONFIG.TIMEOUT
            });
            // console.log(response);

            setBooks(response.data);
            setError(null); // Clear any previous errors
        } catch (error) {
            console.error('Error fetching books:', error);
            setError(error.response?.data?.message || 'Failed to fetch books');
        }
    }

    useEffect(() => {
        if(user) {
            fetchBooks();
        }
    }, [user]);

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