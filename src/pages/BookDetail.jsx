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
    </div>
  )
}

export default BookDetail
