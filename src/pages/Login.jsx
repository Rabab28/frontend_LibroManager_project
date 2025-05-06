import { useState } from 'react'
import { useNavigate } from 'react-router'
import { setTokens } from '../lib/api'
import axios from 'axios'

import Navbar from '../components/Navbar'
import '../styles/global.css'

function Login() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const [error, setError] = useState('')

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/token/`, formData)
      setTokens({
        access: response.data.access,
        refresh: response.data.refresh
      })
      navigate('/')
    } catch (err) {
      console.log(err)
      setError("Invalid username or password")
    }
  }

  return (
    <>
    <Navbar />
      <div className="page-center">
        <div className="container">
            <div className="illustration">
              <img
                src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80"
                alt="Books"
              />
            </div>
            <h1 className="title">Login to LibroManager 📚</h1>
            <form className="form" onSubmit={handleSubmit}>
              <div className="form-field">
                <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
                />
              </div>
              <div className="form-field">
                <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              </div>
              <button className="btn" type="submit">Login</button>
              {error && <p>{error}</p>}
            </form>
        </div>
      </div>
    </>
  )
}

export default Login