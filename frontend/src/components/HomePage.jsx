import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line, Pie } from 'react-chartjs-2';
import moment from 'moment';
import 'chart.js/auto'; // Import Chart.js

const HomePage = () => {
  const [dateTime, setDateTime] = useState(new Date());
  const [categoryData, setCategoryData] = useState({});
  const [totalMachines, setTotalMachines] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000); // Update time every second

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Fetch data for the charts
    axios.get('https://shop-repo.onrender.com/api/machines')
      .then(response => {
        const machines = response.data;

        // Calculate total number of machines
        setTotalMachines(machines.reduce((sum, machine) => sum + machine.quantity, 0));

        // Calculate number of machines by category
        const categoryCounts = machines.reduce((acc, machine) => {
          acc[machine.category] = (acc[machine.category] || 0) + machine.quantity;
          return acc;
        }, {});

        setCategoryData({
          labels: Object.keys(categoryCounts),
          datasets: [{
            label: 'Total Machines by Category',
            data: Object.values(categoryCounts),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            borderColor: 'rgba(255, 255, 255, 0.3)',
            borderWidth: 1,
          }],
        });
      })
      .catch(error => console.error('Error fetching machines:', error));
  }, []);

  // Chart data for total machines added over time
  const addedOverTimeData = {
    labels: ['Total Machines'], // Single label
    datasets: [
      {
        label: 'Total Machines Added',
        data: [totalMachines], // Single data point
        borderColor: '#007bff',
        backgroundColor: 'rgba(0, 123, 255, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ textAlign: 'center' }}>Dashboard</h1>
      <p style={{ textAlign: 'center' }}>
        Welcome to the Machine Inventory System Dashboard. Here you can view the current status of your inventory.
      </p>
      
      <div style={{ display: 'flex', justifyContent: 'space-around', margin: '2rem 0' }}>
        {/* Date and Time Display */}
        <div style={{ flex: 1, textAlign: 'center' }}>
          <h2>Current Date and Time</h2>
          <p>{moment(dateTime).format('MMMM Do YYYY')}</p>
          <p>{moment(dateTime).format('hh:mm:ss A')}</p>
        </div>

        {/* Total Machines in Inventory */}
        <div style={{ flex: 1, textAlign: 'center' }}>
          <h2>Total Machines in Inventory</h2>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{totalMachines}</p>
        </div>

        {/* Total Machines by Category Chart */}
        <div style={{ flex: 1, textAlign: 'center' }}>
          <h2>Total Machines by Category</h2>
          <Pie data={categoryData} />
        </div>
      </div>

      {/* Total Machines Added Over Time Chart */}
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <h2>Total Machines Added</h2>
        <Line data={addedOverTimeData} options={{ maintainAspectRatio: false }} />
      </div>
    </div>
  );
};

export default HomePage;
