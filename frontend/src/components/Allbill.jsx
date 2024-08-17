import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/Allbill.css'; // Import the CSS file for styling

const AllBills = () => {
  const [bills, setBills] = useState([]);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('none'); // Default sorting option

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/bills');
        setBills(response.data);
        setError(null); // Clear previous errors
      } catch (error) {
        console.error('Error fetching bills:', error);
        setError('Failed to load bills. Please try again later.');
      }
    };

    fetchBills();
  }, []);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  // Convert month number to month name
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const sortBillsByMonth = (bills, monthIndex) => {
    return bills.slice().filter(bill => new Date(bill.date).getMonth() === monthIndex);
  };

  const sortedBills = sortBy === 'none'
    ? bills
    : monthNames.indexOf(sortBy) !== -1
    ? sortBillsByMonth(bills, monthNames.indexOf(sortBy))
    : bills;

  if (error) return <div>{error}</div>;
  if (!bills.length) return <div>Loading...</div>;

  return (
    <div className="all-bills-container">
      <div className="sort-options">
        <label htmlFor="sortBy">Sort By:</label>
        <select id="sortBy" value={sortBy} onChange={handleSortChange}>
          <option value="none">None</option>
          {monthNames.map((month, index) => (
            <option key={index} value={month}>{month}</option>
          ))}
        </select>
      </div>
      <h1>All Bills</h1>
      <ul className="bill-list">
        {sortedBills.map(bill => (
          <li key={bill._id}>
            <Link to={`/bills/${bill._id}`}>
              <p>Customer Name: {bill.customerName}</p>
              <p>Date: {new Date(bill.date).toLocaleDateString()}</p>
              <p>Month: {monthNames[new Date(bill.date).getMonth()]}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllBills;
