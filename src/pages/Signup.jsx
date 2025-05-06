import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router'
import { setTokens } from '../lib/api'
import Navbar from '../components/Navbar'
import '../styles/global.css'
import { useNavigate } from 'react-router'

function Signup() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()
    setErrorMessage('')
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/signup/',
        { username, password, email }
      )
      console.log(response.data)
      setTokens(response.data)
      navigate('/login')
    } catch (err) {
      console.log(err)
      if (err.response && err.response.data){
            if (err.response.data.username){
                setErrorMessage("The username is already exist")
            } else if (err.response.data.non_field_errors){
                setErrorMessage(err.response.data.non_field_errors.join(''))
            }else {
                setErrorMessage('An error occurred while signup, try again.')
            }
        }else if(err.request){
            setErrorMessage("No responce from the server")
        } else {
            setErrorMessage("An error occured while the request")
        }
    }
  }

  return (
    <>
      <Navbar />
      <div className="page-center">
        <div className="container">
          {/* Book illustration */}
          <div className="illustration">
            <img
              src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80"
              alt="Books"
            />
          </div>
          <h1 className="title">Welcome to LibroManager!</h1>
          <p className="subtitle">Create your joyful reading journey 🌈</p>

          <form className="form" onSubmit={handleSubmit}>
            <div className="form-field">
              <input
                type="text"
                placeholder="Name"
                name="username"
                className="signup-input"
                onChange={event => setUsername(event.target.value)}
                value={username}
                required
              />
            </div>
            <div className="form-field">
              <input
                type="email"
                placeholder="Email"
                name="email"
                className="signup-input"
                onChange={event => setEmail(event.target.value)}
                value={email}
                required
              />
            </div>
            <div className="form-field">
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="signup-input"
                onChange={event => setPassword(event.target.value)}
                value={password}
                required
              />
            </div>
            {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}
            <button className="btn" type="submit">
              Sign Up
            </button>
            <div className="signup-login">
              Already have an account?{' '}
              <Link to={'/login'} className="signup-login-link">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Signup
