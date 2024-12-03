import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const BooksByGenre = () => {

    const { genre } = useParams();

    const [ books, setBooks ] = useState([]);

    const fetchBooksByGenre = async() => {
        try {
            const response = await axios.get(`http://localhost:5000/books/genre/${genre}`);
            const data = response.data;

            setBooks(data);
        } catch (error) {
            console.error('Error While Fetching Books', error);
        }
    }

    useEffect(() => {
        fetchBooksByGenre();
    }, []);

  return (
    <div>
        {books && books.map( book => (
            <div key={book._id}>
                {book.title}
                <p>{book.genre}</p>
            </div>
        ))}
    </div>
  )
}

export default BooksByGenre