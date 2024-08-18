import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ProductSearch.css'; // Import the CSS file

const allCategories = ['power tools', 'fan', 'light', 'pump and motors']; // Define all possible categories

const ProductSearch = () => {
  const [machines, setMachines] = useState([]);
  const [search, setSearch] = useState('');
  const [quantity, setQuantity] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(''); // State to store selected category

  useEffect(() => {
    axios.get('https://shop-repo.onrender.com/api/machines')
      .then(response => setMachines(response.data))
      .catch(error => console.error('Error fetching machines:', error));
  }, []);

  const handleQuantityChange = (id, value) => {
    const qty = Math.max(1, parseInt(value, 10) || 1);
    setQuantity(prevQuantity => ({
      ...prevQuantity,
      [id]: qty
    }));
  };

  const addToCart = (id) => {
    const qty = quantity[id] || 1;
    if (qty <= 0) return;

    axios.post('https://shop-repo.onrender.com/api/machines/cart/add', { id, quantity: qty })
      .then(() => {
        alert('Product added to cart');
        setMachines(prevMachines => 
          prevMachines.map(machine => 
            machine._id === id ? { ...machine, quantity: machine.quantity - qty } : machine
          ).filter(machine => machine.quantity > 0)
        );
      })
      .catch(error => {
        if (error.response && error.response.data.message) {
          alert(error.response.data.message);
        } else {
          console.error('Error adding product to cart:', error);
        }
      });
  };

  const deleteMachine = (id) => {
    axios.delete(`https://shop-repo.onrender.com/api/machines/${id}`)
      .then(() => {
        alert('Machine deleted successfully');
        setMachines(prevMachines => prevMachines.filter(machine => machine._id !== id));
      })
      .catch(error => {
        if (error.response && error.response.data.message) {
          alert(error.response.data.message);
        } else {
          console.error('Error deleting machine:', error);
        }
      });
  };

  // Filter machines by name or company name and selected category
  const filteredMachines = machines.filter(machine =>
    (machine.name.toLowerCase().includes(search.toLowerCase()) ||
     machine.companyName.toLowerCase().includes(search.toLowerCase())) &&
    (selectedCategory === '' || machine.category === selectedCategory)
  );

  return (
    <div className="container">
      <h1>Search Products</h1>
      <div className="filters">
        <input
          type="text"
          placeholder="Search by name or company"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-select"
        >
          <option value="">All Categories</option>
          {allCategories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Purchase Price</th>
            <th>Product Code</th> {/* Changed from Sell Price */}
            <th>Purchased From</th> {/* New column */}
            <th>Company</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Buy</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredMachines.map(machine => (
            <tr key={machine._id}>
              <td>{machine.name}</td>
              <td>₹{machine.purchasePrice}</td>
              <td>{machine.product_code}</td> {/* Added product code */}
              <td>{machine.purchased_from}</td> {/* Added purchased from */}
              <td>{machine.companyName}</td>
              <td>{machine.category}</td>
              <td>{machine.quantity}</td>
              <td>
                <input
                  type="number"
                  min="1"
                  value={quantity[machine._id] || 1}
                  onChange={(e) => handleQuantityChange(machine._id, e.target.value)}
                  className="quantity-input"
                />
                <button onClick={() => addToCart(machine._id)} className="button">Buy Product</button>
              </td>
              <td>
                <button onClick={() => deleteMachine(machine._id)} className="delete-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductSearch;
