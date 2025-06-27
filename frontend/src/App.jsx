import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { WishlistProvider } from './context/WishlistContext';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import ShopPage from './pages/ShopPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import BecomeSellerPage from './pages/BecomeSellerPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import './App.css';

const PageLayout = () => (
  <div className="container">
    <Outlet />
  </div>
);

function App() {
  return (
    <Router>
      <WishlistProvider>
        <div className="app-container">
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route element={<PageLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/auctions/:id" element={<ProductDetailPage />} />
                <Route path="/sell" element={<BecomeSellerPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
            </Routes>
          </main>
          <Footer />
        </div>
      </WishlistProvider>
    </Router>
  );
}

export default App;
