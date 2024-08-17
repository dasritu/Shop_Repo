// src/components/Layout.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Layout.css'; // For styling

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <nav className="sidebar">
        <h2>Navigation</h2>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/add-machine">Add Machine</Link></li>
          <li><Link to="/product-search">Product Search</Link></li>
          <li><Link to="/bill">Bill</Link></li>
          <li><Link to="/all-bills">All Bills</Link></li> 
        </ul>
      </nav>
      <main className="content">
        {children}
      </main>
    </div>
  );
};

export default Layout;
