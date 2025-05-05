import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router';

const BorrowingList = () => {
    const [borrowings, setBorrowings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Get the borrowing list
        axios.get('http://127.0.0.1:8000/api/borrowings/') 
            .then(response => {
                setBorrowings(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);


    const handelDeleteBorrowing= (id) =>{
      if (window.confirm('Are you sure you want to delete this borrowing?')) {
        axios.get(`http://127.0.0.1:8000/api/borrowings/${id}/`) 
            .then(response => {
                // Update the list after the success delete
                setBorrowings(borrowings.filter(borrowings => borrowings.id !== id));
            })
            .catch(error => {
                console.error("Error deleting borrowing:", error)
                alert("An error occurred while deleting the borrowing.")
            })
      }
    }

    if (loading) {
        return <p>Loading borrowing list...</p>;
    }

    if (error) {
        return <p>Error loading borrowing list: {error.message}</p>;
    }

    return (
        <div>
            <h2>List of borrowings: </h2>
            {borrowings.length === 0 ? (
                <p>There are currently no borrowings.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Book Title: </th>
                            <th>Borrower's Name: </th>
                            <th>Borrow Date: </th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {borrowings.map(borrowing => (
                            <tr key={borrowing.id}>
                                <td>{borrowing.book.book_title ? borrowing.book.book_title :'Unavailable'}</td>
                                <td>{borrowing.borrower_name}</td>
                                <td>{new Date(borrowing.borrow_date).toLocaleDateString()}</td>
                                <td><Link to={`/edit-borrowings/${borrowing.id}`}>Edit</Link>  <button onClick={()=> handelDeleteBorrowing(borrowing.id)}>Delete</button></td> 
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default BorrowingList;