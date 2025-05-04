import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReadingList = () => {
  const [readingList, setReadingList] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/books/reading-list/')
      .then(response => {
        setReadingList(response.data);
      })
      .catch(error => {
        console.error('An error occurred while fetching the reading list:', error);
      });
  }, []);


  const handelStatusChange = (itemId, newStatus) => {
    axios.patch(`http://127.0.0.1:8000/api/books/reading-list-update/${itemId}`, {status: newStatus})
    .then(response => {
        setReadingList(readingList.map(item => 
            item.id === itemId ? { ...item, status: response.data.status} : item
        ))
    })
    .catch(error => {
        console.error('An error occurred while updating the reading status:', error)
    })
  }
  return (
    <div>
      <h2>Your Reading List</h2>
      {readingList.length === 0 ? (
        <p>The Reading list is Empty</p>
      ) : (
        <ul>
          {readingList.map(item => (
            <li key={item.book.id}>
                {item.book.book_pic_url && ( <img src={item.book.book_pic_url}
                
                alt={item.book.book_title} /> )}
                <span>{item.book.book_title}</span>
                <select
                value={item.status}
                onChange={(e) => handelStatusChange(item.id, e.target.value)}
                >
                    <option value="N"> Not Read </option>
                    <option value="R"> Reading </option>
                    <option value="F"> Finished </option>
                </select>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReadingList;