import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

const HomePage = () => {
  const [dateTime, setDateTime] = useState(new Date());
  const [totalMachines, setTotalMachines] = useState(0);
  const [categoryCounts, setCategoryCounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000); // Update time every second

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    axios.get('https://shop-repo.onrender.com/api/machines')
      .then(response => {
        const machines = response.data;

        // Calculate total number of machines
        const total = machines.reduce((sum, machine) => sum + machine.quantity, 0);
        setTotalMachines(total);

        // Calculate category-wise count
        const counts = machines.reduce((acc, machine) => {
          acc[machine.category] = (acc[machine.category] || 0) + machine.quantity;
          return acc;
        }, {});

        setCategoryCounts(counts);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching machines:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ textAlign: 'center' }}>Dashboard</h1>
      <p style={{ textAlign: 'center' }}>
        Welcome to the Machine Inventory System Dashboard. Here you can view the current status of your inventory.
      </p>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', margin: '2rem 0' }}>
        {/* Date and Time Display */}
        <div style={{ flex: 1, padding: '1rem', backgroundColor: '#f4f4f4', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          <h2 style={{ textAlign: 'center' }}>Current Date and Time</h2>
          <p style={{ fontSize: '1.2rem', textAlign: 'center' }}>{moment(dateTime).format('MMMM Do YYYY')}</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center' }}>{moment(dateTime).format('hh:mm:ss A')}</p>
        </div>

        {/* Total Machines in Inventory */}
        <div style={{ flex: 1, padding: '1rem', backgroundColor: '#f4f4f4', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          <h2 style={{ textAlign: 'center' }}>Total Machines in Inventory</h2>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center' }}>{loading ? 'Loading...' : totalMachines}</p>
        </div>
      </div>

      {/* Category-wise Count */}
      <div style={{ padding: '1rem', backgroundColor: '#f4f4f4', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ textAlign: 'center' }}>Machine Count by Category</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {loading ? (
            <p style={{ textAlign: 'center' }}>Loading...</p>
          ) : (
            Object.keys(categoryCounts).map(category => (
              <div key={category} style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff' }}>
                <h3 style={{ margin: '0' }}>{category}</h3>
                <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{categoryCounts[category]}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
