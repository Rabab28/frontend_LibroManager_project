import React from "react";
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router'
import { authorizedRequest } from '../lib/api'
import Navbar from '../components/Navbar'
import '../styles/global.css'

function BookDetail() {
    const {id} = useParams() // Take the id from the url
    const navigate = useNavigate()

    // const [status , setStatus] = useState('N')
    const [book , setBook] = useState(null)
    const [errorMsg, setErrorMsg] = useState('')
    const [deleteConfirm, setDeleteConfirm] = useState(false)

    async function getSingleBook() {
        // get the book from the API
        // put the book in state
        try{
            // make the login in the background
            const responce = await authorizedRequest('get', `/books/${id}`)
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
            const response = await authorizedRequest('delete', `/books/${id}/`)
            if (response.status === 204){
                navigate('/')
            }
            
        } catch (err) {
            console.log(' Book deletion failed:', err)
        }
    }
    
    function ConfirmDeleteBook(){
        setDeleteConfirm(true)
    }

    if (errorMsg) return <h1 className='title'>{errorMsg}</h1>
    if(!book) return <h1 className='title'>Loading your Book...</h1>

  return (
    <>
      <Navbar />
      <div className="page-center">
        <div className="container">
        <h2 className='title'>Book Detail:</h2>
        <p>{book.book_pic_url}</p>
        <h2>{book.book_title}</h2>
        <p className='subtitle'>The author:</p>
        <p>{book.book_author}</p>
        <p className='subtitle'>Year of publish:</p>
        <p>{book.book_year}</p>
        <p className='subtitle'>No.of pages:</p>
        <p>{book.book_no_of_pages}</p>
        <p className='subtitle'>The language:</p>
        <p>{book.book_language}</p>
        <p className='subtitle'>The brief:</p>
        <p>{book.book_brief}</p>
        {
            deleteConfirm
            ?
            <button className='btn' onClick={deleteBook}>Are You sure?</button>
            :
            <button className='btn' onClick={ConfirmDeleteBook}>Delete</button>
        }

        {/* Got it from https://bobbyhadz.com/blog/react-button-link */}
        <Link to={`/books/${id}/edit`}>
            <button className='btn'>Edit</button>
        </Link>
        <Link to={`/`}>
            <button className='btn'>Return</button>
        </Link>
    </div>
    </div>
    </>
  )
}

export default BookDetail
