import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import ShopPage from './pages/ShopPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import BecomeSellerPage from './pages/BecomeSellerPage.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Navigate to="/shop" />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/auctions/:id" element={<ProductDetailPage />} />
              <Route path="/sell" element={<BecomeSellerPage />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
