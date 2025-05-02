import React from "react";
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams, useNavigate} from 'react-router'

function BookDetail() {
    const {id} = useParams()
    const navigate = useNavigate()

    const [book , setBook] = useState(null)
    const [errorMsg, setErrorMsg] = useState('')
    const [deleteConfirm, setDeleteConfirm] = useState(false)

    async function getSingleBook() {
        try{
            const responce = await axios.get(`http://127.0.0.1:8000/api/books/${id}`)
            setBook(responce.data) 
        } catch (err){
            console.log(err)
            if (err.status === 404){
                navigate('/not-found')
            } else {
                setErrorMsg("Oh, Something went Wrong !")
            }
        }
    }

    useEffect(() =>{ 
        getSingleBook()
        console.log(id)
    }, []) // empty array to stop loading for an infinite in the consoler
    

    async function deleteBook(){
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/api/books/${id}`)
            if (response.status === 204){
                navigate('/')
            }
            
        } catch (err) {
            console.log(err)
        }
    }
    
    function ConfirmDeleteBook(){
        setDeleteConfirm(true)
    }

    if (errorMsg) return <h1>{errorMsg}</h1>
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
      {
        deleteConfirm
        ?
        <button onClick={deleteBook}>Are You sure?</button>
        :
        <button onClick={ConfirmDeleteBook}>Delete</button>
      }
    </div>
  )
}

export default BookDetail
