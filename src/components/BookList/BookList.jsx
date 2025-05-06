import React from 'react'

import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { authorizedRequest } from '../../lib/api'

function BookList() {

    const [books, setBooks] = useState([])

    async function getAllBooks() {
        try{
            const response = await authorizedRequest("get", "/books/")
            setBooks(response.data)  
        } catch (err) {
            console.error("Error fetching books:", err)
        }    
    }

    useEffect(()=> {
        getAllBooks() 
    }, [])
    

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
