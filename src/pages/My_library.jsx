import React from "react";
import { useNavigate } from 'react-router'

import BookList from "../components/BookList/BookList";

function My_library() {
    return(
        <>
            <h1>LibroManager</h1>
            <BookList/>
        </>
    )
}

export default My_library
