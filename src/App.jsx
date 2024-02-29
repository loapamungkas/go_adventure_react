import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Home from './pages/Home';
import Category from './pages/Category';
import History from './pages/History';
import ProductDetails from './pages/ProductDetails';
import PenyewaanDetails from './pages/PenyewaanDetails';

function App() {
  const token = localStorage.getItem('access_token');
  // const navigate = useNavigate();
  return (
    <>
      <Router>
        {/* Navbar */}
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/category/:id" element={<Category />} />
          {/* {token ? <Route path="/history" element={<History />} /> : <Route path="/login" element={<Login />} />} */}
          <Route
            path="/history"
            element={
              token ? (
                <History />
              ) : (
                // Jika token tidak ditemukan, redirect ke halaman login
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/penyewaan/:id" element={<PenyewaanDetails />} />
        </Routes>
      </Router>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;
