import React from 'react'
import { useState } from 'react'
import axios from 'axios'

import BookForm from '../components/BookForm/BookForm'

function BookAdd() {

    const [book_title, setBookTitle] = useState('')
    const [book_auther, setBookAuther] = useState('')
    const [book_year, setBookYear] = useState('')
    const [book_no_of_pages, setBookNoOfPages] = useState('')
    const [book_language, setBookLanguage] = useState('')
    const [book_brief, setBookBrief] = useState('')
    const [book_pic_url, setBookPicUrl] = useState('')

    async function handleSubmit(event){
        event.preventDefault()
        console.log('Handle Submit is running')
        const payload = {book_title,book_auther, book_year, book_no_of_pages, book_language, book_brief, book_pic_url}
        const url = 'http://127.0.0.1:8000/api/books/'
        const response = await axios.post(url, payload)
        console.log(response)
        setBookTitle("")
        setBookAuther("")
        setBookYear("")
        setBookNoOfPages("")
        setBookLanguage("")
        setBookBrief("")
        setBookPicUrl("")
    }

    return (
        <div>
            <h2>Book Add</h2>
            <BookForm 
                book_title={book_title}
                setBookTitle={setBookTitle}

                book_auther={book_auther}
                setBookAuther={setBookAuther}

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
            />
        </div>
    )
}

export default BookAdd