import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import { authorizedRequest } from '../lib/api';
import Navbar from '../components/Navbar'
import '../styles/global.css'

const BorrowingList = () => {
    const [borrowings, setBorrowings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Get the borrowing list
    async function getAllBorrowings() {
        try {
            const response = await authorizedRequest('get', '/borrowings/')
            setBorrowings(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching borrowings:', err)
            setLoading(false);
        }
    }

    useEffect(() => {
        getAllBorrowings()
    }, [])


    const handelDeleteBorrowing= (id) =>{
      if (window.confirm('Are you sure you want to delete this borrowing?')) {
        axios.delete(`http://127.0.0.1:8000/api/borrowings/${id}/`) 
            .then(response => {
                // Update the list after the success delete
                setBorrowings(borrowings.filter(borrowing => borrowing.id !== id));
            })
            .catch(error => {
                console.error("Error deleting borrowing:", error)
                alert("An error occurred while deleting the borrowing.")
            })
      }
    }

    if (loading) {
        return <p className='title'>Loading borrowing list...</p>;
    }

    if (error) {
        return <p className='title'>Error while loading borrowing list: {error.message}</p>;
    }

    return (
        <>
        <Navbar />
        <h2 className='title'>Borrowings List</h2>
        <div className="page-center">
            {borrowings.length === 0 ? (
                <p className='subtitle'>There are currently no borrowings.</p>
            ) : (
                <div>                            
                    {borrowings.map(borrowing => (
                        <div key={borrowing.id} className='container'>
                            <p className='subtitle'>The Book:</p>
                            <p>{borrowing.book_detail ? borrowing.book_detail.book_title :'Unavailable'}</p>
                            <p className='subtitle'>The borrower:</p>
                            <p>{borrowing.borrower_name}</p>
                            <p className='subtitle'>Borrow date:</p>
                            <p>{new Date(borrowing.borrow_date).toLocaleDateString()}</p>
                            <p><Link to={`/edit-borrowings/${borrowing.id}`}>
                            <button className='btn'>Edit</button></Link>
                            <button className='btn' onClick={()=> handelDeleteBorrowing(borrowing.id)}>Delete</button></p>
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

export default BorrowingList;