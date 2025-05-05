import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Borrowings = () => {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState('');
    const [borrowerName, setBorrowerName] = useState('');
    const [borrowDate, setBorrowDate] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Get the list of the books
        axios.get('http://127.0.0.1:8000/api/books/')
            .then(response => setBooks(response.data))
            .catch(error => console.error('Error fetching books:', error));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newBorrowing = {
            book: selectedBook,
            borrower_name: borrowerName,
            borrow_date: borrowDate,
        };

        axios.post('http://127.0.0.1:8000/api/borrowings/', newBorrowing)
            .then(response => {
                setMessage('تمت إضافة الاستعارة بنجاح!');
                setSelectedBook('');
                setBorrowerName('');
                setBorrowDate('');
                setTimeout(() => setMessage(''), 3000); // إخفاء الرسالة بعد 3 ثوانٍ
            })
            .catch(error => setMessage('حدث خطأ أثناء إضافة الاستعارة.'));
    };

    return (
        <div>
            <h2>إضافة استعارة كتاب</h2>
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
                    <label htmlFor="borrowerName">اسم المستعير:</label>
                    <input
                        type="text"
                        id="borrowerName"
                        value={borrowerName}
                        onChange={(e) => setBorrowerName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="borrowDate">تاريخ الاستعارة:</label>
                    <input
                        type="date"
                        id="borrowDate"
                        value={borrowDate}
                        onChange={(e) => setBorrowDate(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">إضافة استعارة</button>
            </form>
        </div>
    );
};

export default Borrowings;