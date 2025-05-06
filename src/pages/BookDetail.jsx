import React from "react";
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router'
import { authorizedRequest } from '../lib/api'

function BookDetail() {
    const {id} = useParams() // Take the id from the url
    const navigate = useNavigate()

    const [status , setStatus] = useState('N')
    const [book , setBook] = useState(null)
    const [errorMsg, setErrorMsg] = useState('')
    const [deleteConfirm, setDeleteConfirm] = useState(false)

    async function getSingleBook() {
        // get the book from the API
        // put the book in state
        try{
            // make the login in the background
            const response = await authorizedRequest('get', `/books/${id}`)
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

    const handelAddBookToReadingList = ()=> {
        axios.post(`http://127.0.0.1:8000/api/books/add-to-reading-list/${id}/`, {status: status})
        .then(responce => {
            alert(responce.data.message)
            // navigate('/books/reading-list/')
        })
        .catch(error => {
            console.error('Something went wrong during add the book', error)
            if (error.responce && error.responce.status === 409) {
                alert("The book is already exist in the reading list")
            } else {
                alert("Something went wrong during add the book")
            }
            navigate('/books/reading-list/')
        }
        )
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

        {/* <AddToReadingList pk={id} onBookAdded={handelAddBookToReadingList}/> */}
            <button onClick={handelAddBookToReadingList}>Add To My Reading List</button>

        {/* Got it from https://bobbyhadz.com/blog/react-button-link */}
        <Link to={`/books/${id}/edit`}>
            <button>Edit</button>
        </Link>
        <Link to={`/`}>
            <button>Return</button>
        </Link>
    </div>
  )
}

export default BookDetail
