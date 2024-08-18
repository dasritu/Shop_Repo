// src/components/BillDetails.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/BillDetails.css'; // Import the CSS file for styling

const BillDetails = () => {
  const { id } = useParams(); // Get the bill ID from the URL
  const [bill, setBill] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBillDetails = async () => {
      try {
        const response = await axios.get(`https://shop-repo.onrender.com/api/bills/${id}`);
        setBill(response.data);
        setError(null); // Clear previous errors
      } catch (error) {
        console.error('Error fetching bill details:', error);
        setError('Failed to load bill details. Please try again later.');
      }
    };

    fetchBillDetails();
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!bill) return <div>Loading...</div>;

  const formatCurrency = (amount) => {
    return amount ? `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '₹0.00';
  };

  return (
    <div className="bill-details-container">
      <h1>Bill Details</h1>
      <div className="bill-info">
        <p><strong>Customer Name:</strong> {bill.customerName}</p>
        <p><strong>Customer Phone:</strong> {bill.customerPhone}</p>
        <p><strong>Date:</strong> {new Date(bill.date).toLocaleDateString()}</p>
      </div>
      <h2>Cart Details</h2>
      <table className="bill-details-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Cost Price</th>
            <th>Purchase Price</th>
            <th>Total Price</th>
            <th>GST Price</th>
          </tr>
        </thead>
        <tbody>
          {bill.cartDetails && bill.cartDetails.length > 0 ? (
            bill.cartDetails.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{formatCurrency(item.costPrice)}</td>
                <td>{formatCurrency(item.purchasePrice)}</td>
                <td>{formatCurrency(item.totalPrice)}</td>
                <td>{formatCurrency(item.gstPrice)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No items in the cart</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="bill-summary">
        <p><strong>Total Price:</strong> {formatCurrency(bill.totalPrice)}</p>
        <p><strong>Total GST:</strong> {formatCurrency(bill.gstPrice)}</p>
      </div>
    </div>
  );
};

export default BillDetails;
