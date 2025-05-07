import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { authorizedRequest } from '../../lib/api';
import { Link } from 'react-router';

const Quotations = () => {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState('');
    const [quoteText, setQuoteText] = useState('');
    const [message, setMessage] = useState('');

    // Get the book data
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

    async function handleSubmit(event){
        event.preventDefault()
        const newQuotation = {
            book: selectedBook,
            quote_text: quoteText,
        };
        try{
            const response = await authorizedRequest('post', '/quotations/', newQuotation)
            setMessage('The quotation added successfully!');
            setSelectedBook('');
            setQuoteText('');
        }catch (err){
            setMessage('An error occurred while adding the quotation.')
        }
    }

    return (
        <div className="page-center">
            <div className="container">
            <h2 className="title">Add a book quotation</h2>
            {message && <p>{message}</p>}
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-field">
                    <label htmlFor="book">The book: </label>
                    <select
                        id="book"
                        value={selectedBook}
                        onChange={(e) => setSelectedBook(e.target.value)}
                        required
                    >
                        <option value="">Choose a book:</option>
                        {books.map(book => (
                            <option key={book.id} value={book.id}>{book.book_title}</option>
                        ))}
                    </select>
                </div>
                <div className="form-field">
                    <label htmlFor="quoteText">Quote text:</label>
                    <input
                        type="text"
                        id="quoteText"
                        value={quoteText}
                        onChange={(e) => setQuoteText(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add</button>
                <Link to={`/`}>
                    <button className='btn'>Return</button>
                </Link>
            </form>
        </div>
        </div>
    );
};

export default Quotations;