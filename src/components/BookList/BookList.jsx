import React from 'react'
import axios from 'axios'

import { useEffect, useState } from 'react'
import { Link } from 'react-router'

function BookList() {

    const [books, setBooks] = useState([])

    async function getAllBooks() {
        try{
            const response = await axios.get('http://127.0.0.1:8000/api/books/')
            console.log(response.data)
            setBooks(response.data)  
        } catch (err) {
            console.error('Error fetching posts:', err)
        }
        
    }

    useEffect(()=> {
        getAllBooks() }, [])
    

    return (
        <div>
            <h2>My Library:</h2>
            <Link to={`/books/new`}>
                <button>Add new Book</button>
            </Link>
            <ul>
                {books.map(book => {
                    return(
                        <li key={book.id}>
                            <p>{book.book_pic_url}</p>
                            <Link to={`/books/${book.id}`}>{book.book_title}</Link>
                            <p>{book.book_author}</p>
                        </li>
                    )
                })}
            </ul>
        </div>
  )
}

export default BookList
