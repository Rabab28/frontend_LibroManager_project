import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; 

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

    useEffect(() => {
        // Get the borrowing data 
        axios.get(`http://127.0.0.1:8000/api/quotations/${id}/`)
            .then(response => {
                setQuotationData(response.data)
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
        setQuotationData({ ...quotationData, [e.target.name]: e.target.value });
    };

    const handleBookChange = (e) => {
        setQuotationData({ ...quotationData, book: e.target.value });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://127.0.0.1:8000/api/quotations/${id}/`, quotationData)
            .then(response => {
                console.log('Quotation updated:', response.data);
                navigate('/quotations-list'); // Navigate to the borrowings list after the edit 
            })
            .catch(error => {
                console.error('Error updating quotation:', error);
                alert('An error occurred while updating the quotation.');
            });
    };

    if (loading) {
        return <p>Loading quotation data...</p>;
    }

    if (error) {
        return <p>There was an error loading quotation data: {error.message}</p>;
    }

    return (
        <div>
            <h2>Modify the quotation</h2>
            <form onSubmit={handleSubmit}>
                <div>
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
                <div>
                    <label htmlFor="quote_text">Quote Text: </label>
                    <input
                        type="text"
                        id="quote_text"
                        name="quote_text"
                        value={quotationData.quote_text}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default EditQuotation;