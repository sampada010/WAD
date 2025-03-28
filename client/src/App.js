import React, { useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);  // State for dark mode toggle

  // Fetch data when button is clicked
  const fetchMessage = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/quote'); // Corrected API endpoint
      const data = await response.json();
      
      console.log('Fetched data:', data); // ✅ Log the data returned by the backend
  
      setMessage(`${data.quote} - ${data.author}`); // Display the quote and author
    } catch (error) {
      console.error('Error fetching quote:', error);
      setMessage('Failed to fetch quote');
    }
    setLoading(false);
  };

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`app-container ${darkMode ? 'dark' : ''}`}>
      {/* Navbar */}
      <nav className="navbar">
        <h2 className="navbar-brand">My Awesome App</h2>
        <div className="navbar-links">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#about">About</a>
        </div>
        <button className="theme-toggle-btn" onClick={toggleDarkMode}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </nav>

      <div className="container">
        <div className="card">
          <h1 className="title">Node.js App</h1>
          <p className="message">{message || 'Click the button to fetch a message!'}</p>
          <button
            onClick={fetchMessage}
            className="fetch-button"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Fetch Message'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
