import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Quotations = () => {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState('');
    const [quoteText, setQuoteText] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Get the list of the books
        axios.get('http://127.0.0.1:8000/api/books/')
            .then(response => setBooks(response.data))
            .catch(error => console.error('Error fetching books:', error));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newQuotation = {
            book: selectedBook,
            quote_text: quoteText,
        };

        axios.post('http://127.0.0.1:8000/api/quotations/', newQuotation)
            .then(response => {
                setMessage('The quotation added successfully!');
                setSelectedBook('');
                setBorrowerName('');
                setBorrowDate('');
                setTimeout(() => setMessage(''), 3000); // Hide the message after 3 seconds
            })
            .catch(error => setMessage('An error occurred while adding the quotation.'));
    };

    return (
        <div>
            <h2>Add a book quotation</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
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
                <div>
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
            </form>
        </div>
    );
};

export default Quotations;