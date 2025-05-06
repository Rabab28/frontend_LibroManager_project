import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { authorizedRequest } from '../../lib/api';
import { Link } from 'react-router';

const Borrowings = () => {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState('');
    const [borrowerName, setBorrowerName] = useState('');
    const [borrowDate, setBorrowDate] = useState('');
    const [message, setMessage] = useState('');

    // Get the list of the books
    async function getBookData() {
        try{
            const response = await authorizedRequest('get',`/books/`)
            setBooks(response.data)
        }catch(error){
            console.error('Error fetching books:', error)
        }
    }
    useEffect(() => {
        getBookData()
    }, []);


    async function handleSubmit(event){
        event.preventDefault();
        const newBorrowing = {
            book: selectedBook,
            borrower_name: borrowerName,
            borrow_date: borrowDate,
        };

        const response = await authorizedRequest('borrowings', 'borrowings', newBorrowing)
            console.log(response)
                setMessage('The borrowing added successfully!');
                setSelectedBook('');
                setBorrowerName('');
                setBorrowDate('');
                setTimeout(() => setMessage(''), 3000); // Hide the message after 3 seconds        
            };

    return (
        <div className="page-center">
        <div className="container">
            <h2 className='title'>Add a book borrowing</h2>
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
                    <label htmlFor="borrowerName">Borrower's name:</label>
                    <input
                        type="text"
                        id="borrowerName"
                        value={borrowerName}
                        onChange={(e) => setBorrowerName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="borrowDate">Borrowing date:</label>
                    <input
                        type="date"
                        id="borrowDate"
                        value={borrowDate}
                        onChange={(e) => setBorrowDate(e.target.value)}
                        required
                    />
                </div>
                <button className="btn" type="submit">Add</button>
                <Link to={"/borrowings-list"}>
                    <button className="btn" type="submit">Cancel</button>
                </Link>  
            </form>
        </div>
    </div>
    );
};

export default Borrowings;