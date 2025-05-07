import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; 
import { authorizedRequest } from '../../lib/api';

const EditQuotation = () => {
    const { id } = useParams(); // To get the id from the URL
    const navigate = useNavigate(); // To navigate after the success edit
    const [quotationData, setQuotationData] = useState({
        book: '',
        quote_text: '',
    });
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Get quotations data
    async function getQuotation() {
        try{
            const response = await authorizedRequest("get", `/quotations/${id}/`)
            setQuotationData(response.data)
        } catch (err) {
            setError(error)
        }    
    }

    useEffect(()=> {
        getQuotation() 
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
        setQuotationData({ ...quotationData, [e.target.name]: e.target.value });
    };

    const handleBookChange = (e) => {
        setQuotationData({ ...quotationData, book: e.target.value });
    };
    

    async function handleSubmit(event){
        event.preventDefault()
            const response = await authorizedRequest('patch', `/quotations/${id}/`, quotationData)
            navigate('/quotations-list'); // Navigate to the quotations list after the edit
      }

    if (loading) {
        return <p className="title">Loading quotation data...</p>;
    }

    if (error) {
        return <p className="title">There was an error loading quotation data: {error.message}</p>;
    }

    return (
        <div className="page-center">
            <div className="container">
                <h2>Modify the quotation</h2>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-field">
                        <label htmlFor="book">The book: </label>
                        <select
                            id="book"
                            name="book"
                            value={quotationData.book || ''}
                            onChange={handleBookChange}
                        >
                            <option value="">Choose a book:</option>
                            {books.map(book => (
                                <option key={book.id} value={book.id}>{book.book_title}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-field">
                        <label htmlFor="quote_text">Quote Text: </label>
                        <input
                            type="text"
                            id="quote_text"
                            name="quote_text"
                            value={quotationData.quote_text || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <button className="btn" type="submit">Save</button>
                </form>
            </div>
        </div>
    );
};

export default EditQuotation;