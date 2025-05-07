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
        
        <>
        <h1 className="title">My Library</h1>
        <Link to={`/books/new`}>
            <button className='btn'>Add New Book</button>
        </Link>
            <div className="page-center">                            
                    <ul>
                        {books.map(book => {
                            console.log("book id in map:", book.id)
                            return(
                            <div key={book.id} className='container'>
                                {
                                    book.book_pic_url 
                                    ?
                                    <img className="book-cover-image" src={book.book_pic_url}/>
                                    :
                                    null 
                                }
                                <Link to={`/books/${book.id}`} className='navbar-link'>{book.book_title}</Link>
                                <p className='subtitle'>The Author:</p> 
                                <p>{book.book_author}</p> 
                            </div>
                            )
                        })}
                    </ul>                             
            </div>
        </>
    )
}

export default BookList
