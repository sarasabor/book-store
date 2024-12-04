import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';

//* the first thing is to create the context 
export const BooksContext = createContext();

const BooksContextProvider = ({children}) => {

    const {user} = useContext(AuthContext);

    const [ books, setBooks ] = useState([]);
    const [ error, setError ] = useState(null);

    const fetchBooks = async() => {
        try {
            const response = await axios.get('http://localhost:5000/books', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            // console.log(response);

            setBooks(response.data);
        } catch (error) {
            setError(error);
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