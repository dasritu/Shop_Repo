import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AddForm.css'; // Import the CSS file

const AddMachineForm = () => {
  const [name, setName] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [sellPrice, setSellPrice] = useState(''); // Updated sellPrice state
  const [category, setCategory] = useState('power tools'); // Added category state with default value

  const handleSubmit = (e) => {
    e.preventDefault();
    const machine = { name, purchasePrice, purchaseDate, companyName, quantity, sellPrice, category };

    axios.post('http://localhost:5000/api/machines/add', machine)
      .then(() => {
        setName('');
        setPurchasePrice('');
        setPurchaseDate('');
        setCompanyName('');
        setQuantity('');
        setSellPrice(''); // Clear sellPrice
        setCategory('power tools'); // Reset category to default
        alert('Machine added successfully');
      })
      .catch((error) => console.error('Error adding machine:', error));
  };

  return (
    <div className="container">
      <h1 className="heading">Add New Machine</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label className="label">
            Name:
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
              className="input" 
            />
          </label>
        </div>
        <div className="form-group">
          <label className="label">
            Purchase Price:
            <input 
              type="number" 
              value={purchasePrice} 
              onChange={(e) => setPurchasePrice(e.target.value)} 
              required 
              className="input" 
            />
          </label>
        </div>
        <div className="form-group">
          <label className="label">
            Purchase Date:
            <input 
              type="date" 
              value={purchaseDate} 
              onChange={(e) => setPurchaseDate(e.target.value)} 
              required 
              className="input" 
            />
          </label>
        </div>
        <div className="form-group">
          <label className="label">
            Company Name:
            <input 
              type="text" 
              value={companyName} 
              onChange={(e) => setCompanyName(e.target.value)} 
              required 
              className="input" 
            />
          </label>
        </div>
        <div className="form-group">
          <label className="label">
            Quantity:
            <input 
              type="number" 
              value={quantity} 
              onChange={(e) => setQuantity(e.target.value)} 
              required 
              className="input" 
            />
          </label>
        </div>
        <div className="form-group">
          <label className="label">
            Sell Price:
            <input 
              type="number" 
              value={sellPrice} 
              onChange={(e) => setSellPrice(e.target.value)} 
              required 
              className="input" 
            />
          </label>
        </div>
        <div className="form-group">
          <label className="label">
            Category:
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)} 
              required 
              className="input"
            >
              <option value="power tools">Power Tools</option>
              <option value="fan">Fan</option>
              <option value="light">Light</option>
              <option value="pump and motors">Pump and Motors</option>
            </select>
          </label>
        </div>
        <button type="submit" className="button">Add Machine</button>
      </form>
    </div>
  );
};

export default AddMachineForm;
