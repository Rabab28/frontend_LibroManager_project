import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import { authorizedRequest } from '../lib/api';
import Navbar from '../components/Navbar'
import '../styles/global.css'

const QuotationsList = () => {
    const [quotations, setQuotations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Get the quotations list
    async function getAllQuotations() {
        try {
            const response = await authorizedRequest('get', '/quotations/')
            setQuotations(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching posts:', err)
            setLoading(false);
        }
    }

    useEffect(() => {
        getAllQuotations()
    }, [])

    const handelDeleteQuotation= (id) =>{
        if (window.confirm('Are you sure you want to delete this quotation?')) {
          axios.delete(`http://127.0.0.1:8000/api/quotations/${id}/`) 
              .then(response => {
                  // Update the list after the success delete
                  setQuotations(quotations.filter(quotation => quotation.id !== id));
              })
              .catch(error => {
                  console.error("Error deleting quotation:", error)
                  alert("An error occurred while deleting the quotation.")
              })
        }
      }

    if (loading) {
        return <p className='title'>Loading quotations list...</p>;
    }

    if (error) {
        return <p className='title'>Error loading quotations list: {error.message}</p>;
    }

    return (
        <>
        <Navbar />
        <h2 className='title'>List of quotations:</h2>
        <div className="page-center">
            {quotations.length === 0 ? (
                <p className='subtitle'>There are currently no quotations.</p>
            ) : (
                <div>
                    {quotations.map(quotation => (
                        <div key={quotation.id} className='container'>
                            <p className='subtitle'>The book title:</p>
                            <p>{quotation.book_detail ? quotation.book_detail.book_title :'Unavailable'}</p>
                            <p className='subtitle'>Quotation Text:</p>
                            <p>{quotation.quote_text}</p>
                            <p><Link to={`/edit-quotations/${quotation.id}`}>
                            <button className='btn'>Edit</button></Link>
                            <button className='btn' onClick={()=> handelDeleteQuotation(quotation.id)}>Delete</button></p> 
                            <Link to={"/"}>
                                <button className="btn" type="submit">Return</button>
                            </Link>
                        </div>
                    ))}        
                </div>
            )}
        </div>
        </>
    );
};

export default QuotationsList;