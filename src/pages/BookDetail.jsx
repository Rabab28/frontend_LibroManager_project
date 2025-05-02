import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

function BookDetail() {
    const {id} = useParams()
    const {book , setBook} = useState(null)

    async function getSingleBook() {
        const responce = await axios.get(`http://127.0.0.1:8000/api/books/${id}`)
        setBook(responce.data)
    }

    useEffect(() =>{ 
        getSingleBook()
        console.log(id)
    }, []) // empty array to stop loading for an infinite in the consoler
    if(!book) return <h1>Loading your Book...</h1>

  return (
    <div>
      <h2>Book Detail:</h2>
      <p>{book.book_pic_url}</p>
      <p>{book.book_title}</p>
      <p>{book.book_auther}</p>
      <p>{book.book_year}</p>
      <p>{book.book_no_of_pages}</p>
      <p>{book.book_language}</p>
      <p>{book.book_brief}</p>
    </div>
  )
}

export default BookDetail
