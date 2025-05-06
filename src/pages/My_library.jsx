import React from "react";
import { useNavigate } from 'react-router'

import BookList from "../components/BookList/BookList";

function My_library() {
    const navigate = useNavigate()

    function handleLogout() {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')

        navigate('/signup') 
    }

    return(
        <>            
            <button onClick={handleLogout}> Logout </button>
            <h1>My Library:</h1>
            <BookList/>
        </>
    )
}

export default My_library
