import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const GetBookById = () => {

    //* get the user from user context 
    //* get the id from the url 
    //* create the variable null 
    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBook = async() => {
           const res  = await axios.get('http://localhost:5000/books/6734f6c25830cf9d18bfa4ce');
        }
    })

  return (
    <div>GetBookById</div>
  )
}

export default GetBookById