import React from 'react'
import axios from 'axios'

import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { authorizedRequest } from '../lib/api'

import BookForm from '../components/BookForm/BookForm'

function BookEdit() {
  
  const {id} = useParams()
  const navigate = useNavigate()
  
  const [book_title, setBookTitle] = useState('')
  const [book_author, setBookAuthor] = useState('')
  const [book_year, setBookYear] = useState('')
  const [book_no_of_pages, setBookNoOfPages] = useState('')
  const [book_language, setBookLanguage] = useState('')
  const [book_brief, setBookBrief] = useState('')
  const [book_pic_url, setBookPicUrl] = useState('')

  async function getBookData() {
    const responce = await authorizedRequest('get', `/books/${id}/`)
    setBookTitle(responce.data.book_title)
    setBookAuthor(responce.data.book_author)
    setBookYear(responce.data.book_year)
    setBookNoOfPages(responce.data.book_no_of_pages)
    setBookLanguage(responce.data.book_language)
    setBookBrief(responce.data.book_brief)
    setBookPicUrl(responce.data.book_pic_url)
  }

  useEffect(() =>{
    getBookData()
  }, [])

  async function handleSubmit(event){
    event.preventDefault()
        const response = await authorizedRequest('patch', `/books/${id}/`,
            {book_title,book_author,book_year,book_no_of_pages,book_language,book_brief,book_pic_url})
        navigate(`/books/${id}`)
  }
  return (
    <div>
        <BookForm 
          book_title={book_title}
          setBookTitle={setBookTitle}

          book_author={book_author}
          setBookAuthor={setBookAuthor}

          book_year={book_year}
          setBookYear={setBookYear}

          book_no_of_pages={book_no_of_pages}
          setBookNoOfPages={setBookNoOfPages}

          book_language={book_language}
          setBookLanguage={setBookLanguage}

          book_brief={book_brief}
          setBookBrief={setBookBrief}

          book_pic_url={book_pic_url}
          setBookPicUrl={setBookPicUrl}

          handleSubmit={handleSubmit}
          titleVerb = "Edit "
        />
    </div>
  )
}

export default BookEdit
