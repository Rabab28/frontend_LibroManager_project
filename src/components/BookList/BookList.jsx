import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'

const BookList = () => {
    const [books, setBooks] = useState([])

    async function getAllBooks() {
        const responce = await axios.get('http://127.0.0.1:8000/api/books/')
        console.log(responce)
        setBooks(responce.data)
    }
    useEffect(()=> {
        getAllBooks()
    }, [])
    

  return (
    <div>
        <h2>My Library:</h2>
        <ul>
            {books.map(book => {
                return(
                    <li key={book.book_id}>
                        <p>{book.book_pic_url}</p>
                        <p>{book.book_title}</p>
                        <p>{book.book_author}</p>
                    </li>
                )
            })}
        </ul>
    </div>
  )
}

export default BookList
