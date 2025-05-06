import React from 'react'
import { useState } from 'react'
import { authorizedRequest } from '../lib/api'

import BookForm from '../components/BookForm/BookForm'

function BookAdd() {

    const [book_title, setBookTitle] = useState('')
    const [book_author, setBookAuthor] = useState('')
    const [book_year, setBookYear] = useState('')
    const [book_no_of_pages, setBookNoOfPages] = useState('')
    const [book_language, setBookLanguage] = useState('')
    const [book_brief, setBookBrief] = useState('')
    const [book_pic_url, setBookPicUrl] = useState('')

    async function handleSubmit(event){
        event.preventDefault()
        const payload = {book_title,book_author, book_year, book_no_of_pages, book_language, book_brief, book_pic_url}
        const url = 'http://127.0.0.1:8000/api/books/'
        const response = await authorizedRequest('book', '/books/', {book_title,book_author, book_year, book_no_of_pages, book_language, book_brief, book_pic_url})
        console.log(response)
        setBookTitle("")
        setBookAuthor("")
        setBookYear("")
        setBookNoOfPages("")
        setBookLanguage("")
        setBookBrief("")
        setBookPicUrl("")
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
                titleVerb = "Add "
            />
        </div>
    )
}

export default BookAdd