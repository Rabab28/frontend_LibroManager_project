import {BrowserRouter as Router, Routes, Route} from 'react-router'
import React from "react";

import My_library from "./pages/My_library";
import BookDetail from './pages/BookDetail';
import BookEdit from './pages/BookEdit';
import BookAdd from './pages/BookAdd';

import ReadingList from './pages/ReadingList';

import Borrowings from './components/Borrowings/Borrowings';
import BorrowingList from './pages/BorrowingsList';
import EditBorrowing from './components/EditBorrowing/EditBorrowing';

import Quotations from './components/Quotations/Quotations';
import QuotationsList from './pages/QuotationsList';
import EditQuotation from './components/EditQuotation/EditQuotation';



function App() {
  return(   
    <Router>
      <Routes>
        <Route path='/' element={<My_library />}/>
        
        <Route path='/books/new' element={<BookAdd />}/>
        <Route path='/books/:id' element={<BookDetail />}/>
        <Route path='/books/:id/edit' element={<BookEdit />}/>

        <Route path='/books/reading-list' element={<ReadingList />}/>

        <Route path='/borrowings' element={<Borrowings />}/>
        <Route path='/borrowings-list' element={<BorrowingList />}/>
        <Route path='/edit-borrowings/:id' element={<EditBorrowing />}/>

        <Route path='/quotations' element={<Quotations />}/>
        <Route path='/quotations-list' element={<QuotationsList />}/>
        <Route path='/edit-quotations/:id' element={<EditQuotation />}/>

     </Routes>
    </Router> 
  )
}

export default App
