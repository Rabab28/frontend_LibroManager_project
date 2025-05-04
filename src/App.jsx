import {BrowserRouter as Router, Routes, Route} from 'react-router'
import React from "react";

import My_library from "./pages/My_library";
import BookDetail from './pages/BookDetail';
import BookEdit from './pages/BookEdit';
import BookAdd from './pages/BookAdd';
import ReadingList from './pages/ReadingList';

function App() {
  return(   
    <Router>
      <Routes>
        <Route path='/' element={<My_library />}/>
        <Route path='/books/new' element={<BookAdd />}/>
        <Route path='/books/:id' element={<BookDetail />}/>
        <Route path='/books/:id/edit' element={<BookEdit />}/>
        <Route path='/books/reading-list' element={<ReadingList />}/>
     </Routes>
    </Router> 
  )
}

export default App
