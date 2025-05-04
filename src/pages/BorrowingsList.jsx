import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BorrowingList = () => {
    const [borrowings, setBorrowings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // جلب قائمة الاستعارات من API Django عند تحميل المكون
        axios.get('http://127.0.0.1:8000/api/borrowings/') // استخدام نفس نقطة نهاية الإنشاء لجلب القائمة (GET)
            .then(response => {
                setBorrowings(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

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
                            <th>Borrower Name: </th>
                            <th>Borrow Date: </th>
                        </tr>
                    </thead>
                    <tbody>
                        {borrowings.map(borrowing => (
                            <tr key={borrowing.id}>
                                <td>{borrowing.book.book_title ? borrowing.book.book_title :'Unavailable'}</td>
                                <td>{borrowing.borrower_name}</td>
                                <td>{new Date(borrowing.borrow_date).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default BorrowingList;