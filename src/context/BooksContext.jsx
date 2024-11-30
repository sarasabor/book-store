import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//* the first thing is to create the context 
export const BooksContext = createContext();

const BooksContextProvider = ({children}) => {

    const navigate = useNavigate();

    const [ books, setBooks ] = useState([]);
    const [ error, setError ] = useState(null);

    const fetchBooks = async() => {
        try {
            const response = await axios.get('https://book-store-api-9hck.onrender.com/books');
            console.log(response);

            setBooks(response.data);
        } catch (error) {
            const { redirect } = error.response.data;
            setError(error);
            navigate(redirect);
        }
    }

    useEffect(() => {
        fetchBooks();
    }, []);

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