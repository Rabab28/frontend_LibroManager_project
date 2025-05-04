import React, { useState } from 'react';
import axios from 'axios';

function AddToReadingForm({ pk, onBookAdded }) { // pk for the id of the book we want to add
  const [readingStatus, setReadingStatus] = useState('Not read');
  const [isAdding, setIsAdding] = useState(false); // the prosess of adding the book to the list
  const [message, setMessage] = useState(''); // a message of add the book successfully
  const [error, setError] = useState(''); // if error happen when try to add the book to the list

  const handleAddToReading = async () => { // function when press the add button
    setIsAdding(true); // the user will not press it again during the process
    setMessage(''); // clear any message before
    setError(''); // clear any error before

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/books/${id}/add-to-reading-list/`, {
        book: pk, // send the id to link it with the reading status 
        reading_status: readingStatus, // send the choosed reading status 
        // يمكنك إضافة أي حقول أخرى يتوقعها Serializer هنا
      });
      if (response.status === 201) {
        setMessage('The book has been added to the list successfully');
        if (onBookAdded) {
          onBookAdded(response.data);
        }
      } else if (response.status === 409) {
        setError('The book is already on the reading list.');
      } else {
        setError('An error occurred during the Add process.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsAdding(false); // Activate the button again
    }
  };

  return (
    <div>
      <h2>Add to reading list</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <div>
        <label htmlFor={`reading-status-${pk}`}>Choose reading status:</label>
        <select
          id={`reading-status-${pk}`}
          value={readingStatus}
          onChange={(e) => setReadingStatus(e.target.value)}
        >
          <option value="Not read">Not read</option>
          <option value="Reading">Reading</option>
          <option value="Finished">Finished</option>
        </select>
      </div>
      <button onClick={handleAddToReading} disabled={isAdding}>
        {isAdding ? 'Adding to the list...' : 'Add to reading list'}
      </button>
    </div>
  );
}

export default AddToReadingForm;