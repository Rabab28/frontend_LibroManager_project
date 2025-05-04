import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReadingList = () => {
    console.log('ReadingList Component rendered')
  const [readingList, setReadingList] = useState([]);

  useEffect(() => {
    console.log('Fetching rending list... ')
    axios.get('http://127.0.0.1:8000/api/books/reading-list/')
      .then(response => {
        console.log('Reading list fetched: ')

        setReadingList(response.data);
      })
      .catch(error => {
        console.error('An error occurred while fetching the reading list:', error);
      });
  }, []);


  const handelStatusChange = (itemId, newStatus) => {
    console.log('itemId in handelStatusChange:', itemId)
    axios.patch(`http://127.0.0.1:8000/api/books/reading-list-update/${itemId}/`, {status: newStatus})
        .then(response => {
            // setReadingList(readingList.map(item => 
            //     item.id === itemId ? { ...item, status: response.data.status} : item))
                // Reget the reading list to update the status
            axios.get('http://127.0.0.1:8000/api/books/reading-list/')
                .then(response => {
                setReadingList(response.data);})
        .catch(error => {
            console.error('An error occurred while refetching the reading list:', error) })
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
          {readingList.map(item => {
                console.log('item in map:', item)
                return (
                    <li key={item.id}>
                        {item.image && ( 
                            <img 
                            src={item.image}
                            alt={item.title} 
                            /> 
                        )}
                        <span>{item.title}</span>
                        <select
                            value={item.status}
                            onChange={(e) => handelStatusChange(item.id, e.target.value)}
                        >
                            <option value="N"> Not Read </option>
                            <option value="R"> Reading </option>
                            <option value="F"> Finished </option>
                        </select>
                    </li>
                )
            })}
        </ul>
      )}
    </div>
  );
};

export default ReadingList;

