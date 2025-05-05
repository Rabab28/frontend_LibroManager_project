import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; 

const EditBorrowing = () => {
    const { id } = useParams(); // To get the id from the URL
    const navigate = useNavigate(); // To navigate after the success edit
    const [borrowingData, setBorrowingData] = useState({
        book: '',
        borrower_name: '',
        borrow_date: ''
    });
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Get the borrowing data 
        axios.get(`http://127.0.0.1:8000/api/borrowings/${id}/`)
            .then(response => {
                setBorrowingData(response.data)
            })
            .catch(error => 
                setError(error)
            );

        // Get the book data
        axios.get('http://127.0.0.1:8000/api/books/')
            .then(response => {
                setBooks(response.data)
                setLoading(false)
            })
            .catch(error => {
                setError(error)
                setLoading(false)
            })
    }, [id]);


    const handleChange = (e) => {
        setBorrowingData({ ...borrowingData, [e.target.name]: e.target.value });
    };

    const handleBookChange = (e) => {
        setBorrowingData({ ...borrowingData, book: e.target.value });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://127.0.0.1:8000/api/borrowings/${id}/`, borrowingData)
            .then(response => {
                console.log('Borrowing updated:', response.data);
                navigate('/borrowings-list'); // Navigate to the borrowings list after the edit 
            })
            .catch(error => {
                console.error('Error updating borrowing:', error);
                alert('An error occurred while updating the Borrowing.');
            });
    };

    if (loading) {
        return <p>Loading borrowing data...</p>;
    }

    if (error) {
        return <p>There was an error loading borrowing data: {error.message}</p>;
    }

    return (
        <div>
            <h2>Modify the borrowing</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="book">The book: </label>
                    <select
                        id="book"
                        name="book"
                        value={borrowingData.book || ''}
                        onChange={handleBookChange}
                    >
                        <option value="">Choose a book:</option>
                        {books.map(book => (
                            <option key={book.id} value={book.id}>{book.book_title}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="borrower_name">Borrower's Name: </label>
                    <input
                        type="text"
                        id="borrower_name"
                        name="borrower_name"
                        value={borrowingData.borrower_name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="borrow_date">Borrow date: </label>
                    <input
                        type="date"
                        id="borrow_date"
                        name="borrow_date"
                        value={borrowingData.borrow_date}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default EditBorrowing;