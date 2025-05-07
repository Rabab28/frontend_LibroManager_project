import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; 
import { authorizedRequest } from '../../lib/api';

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

    // Get borrowing data
    async function getBorrowing() {
        try{
            const response = await authorizedRequest("get", `/borrowings/${id}/`)
            setBorrowingData(response.data)
        } catch (err) {
            setError(error)
        }    
    }

    useEffect(()=> {
        getBorrowing() 
    }, [id])

    // Get the book data
    async function getAllBooks() {
        try{
            const response = await authorizedRequest("get", "/books/")
            setBooks(response.data) 
            setLoading(false) 
        } catch (err) {
            setError(error)
            setLoading(false)
        }    
    }
    useEffect(()=> {
        getAllBooks() 
    }, [id])



    const handleChange = (e) => {
        setBorrowingData({ ...borrowingData, [e.target.name]: e.target.value });
    };

    const handleBookChange = (e) => {
        setBorrowingData({ ...borrowingData, book: e.target.value });
    };


    async function handleSubmit(event){
        event.preventDefault()
            const response = await authorizedRequest('patch', `/borrowings/${id}/`, borrowingData)
            navigate('/borrowings-list')
      }


    if (loading) {
        return <p className="title">Loading borrowing data...</p>;
    }

    if (error) {
        return <p className="title">There was an error loading borrowing data: {error.message}</p>;
    }


    return (
        <div className="page-center">
            <div className="container">
            <h2 className="title" >Modify the borrowing</h2>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-field">
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
                <div className="form-field">
                    <label htmlFor="borrower_name">Borrower's Name: </label>
                    <input
                        type="text"
                        id="borrower_name"
                        name="borrower_name"
                        value={borrowingData.borrower_name || ''}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="borrow_date">Borrow date: </label>
                    <input
                        type="date"
                        id="borrow_date"
                        name="borrow_date"
                        value={borrowingData.borrow_date || ''}
                        onChange={handleChange}
                    />
                </div>
                <button className="btn" type="submit">Save</button>
            </form>
        </div>
        </div>
    );
};

export default EditBorrowing;