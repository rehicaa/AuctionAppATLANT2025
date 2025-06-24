import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Ovdje može ići zajednički Header ili Navbar kasnije */}
        <Routes>
          {<Route path="/login" element={<LoginPage />} />}
          {<Route path="/register" element={<RegisterPage />} />}
          {/* <Route path="/" element={<h1>Početna stranica</h1>} /> */}
        </Routes>
        {/* Ovdje može ići zajednički Footer */}
      </div>
    </Router>
  );
}

export default App;