import React from 'react';
import { Link } from 'react-router';
import '../styles/global.css';
import { useNavigate } from 'react-router';

function Navbar() {
    const navigate = useNavigate()

    function handleLogout() {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')

        navigate('/signup') 
    }

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span role="img" aria-label="books" className="navbar-logo-icon">📚</span>
        <span className="navbar-title">LibroManager</span>
      </div>
      <div className="navbar-links">
        <Link to="/" className="navbar-link">My Library</Link>
        <Link to="/quotations-list" className="navbar-link">Quotations</Link>
        <Link to="/borrowings-list" className="navbar-link">Borrowings</Link>
        <button onClick={handleLogout}> Logout </button>
      </div>
    </nav>
  );
}

export default Navbar;
