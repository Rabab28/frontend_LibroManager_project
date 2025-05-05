import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router';

const QuotationsList = () => {
    const [quotations, setQuotations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Get the quotations list
        axios.get('http://127.0.0.1:8000/api/quotations/') 
            .then(response => {
                setQuotations(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);


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
        return <p>Loading quotations list...</p>;
    }

    if (error) {
        return <p>Error loading quotations list: {error.message}</p>;
    }

    return (
        <div>
            <h2>List of quotations: </h2>
            {quotations.length === 0 ? (
                <p>There are currently no quotations.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Book Title:</th>
                            <th>Quote Text:</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {quotations.map(quotation => (
                            <tr key={quotation.id}>
                                <td>{quotation.book_detail ? quotation.book_detail.book_title :'Unavailable'}</td>
                                <td>{quotation.quote_text}</td>
                                <td><Link to={`/edit-quotations/${quotation.id}`}>
                                <button>Edit</button></Link>     <button onClick={()=> handelDeleteQuotation(quotation.id)}>Delete</button></td> 
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default QuotationsList;