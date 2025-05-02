import {BrowserRouter as Router, Routes, Route} from 'react-router'
import React from "react";

import My_library from "./pages/My_library";
import BookDetail from './pages/BookDetail';
// import BookAdd from "./pages/BookAdd";

function App() {
  return(   
    <Router>
      <Routes>
        <Route path='/' element={<My_library />}/>
        <Route path='/books/:id' element={<BookDetail />} />
     </Routes>
    </Router> 
  )
}

export default App
