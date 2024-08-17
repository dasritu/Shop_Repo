import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Bill.css'; // Import the CSS file
import '../styles/print.css'; 
const BillPage = () => {
  const [bill, setBill] = useState(null);
  const [error, setError] = useState(null);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/machines/cart/bill')
      .then(response => {
        setBill(response.data);
        setError(null); // Clear previous errors
      })
      .catch(error => {
        console.error('Error fetching bill:', error);
        setError('Failed to load bill. Please try again later.');
      });
  }, []);

  const handlePrint = () => {
    window.print(); // Trigger the print dialog
  };

  const handleDelete = (id, quantity) => {
    axios.delete('http://localhost:5000/api/machines/cart/delete', { data: { id, quantity } })
      .then(response => {
        if (response.status === 200) {
          setBill(prevBill => ({
            ...prevBill,
            cartDetails: prevBill.cartDetails.filter(item => item._id !== id),
          }));
          setError(null); // Clear previous errors
        } else {
          setError('Failed to delete item. Please try again later.');
        }
      })
      .catch(error => {
        console.error('Error deleting item:', error);
        setError('Failed to delete item. Please try again later.');
      });
  };

  const handleSaveBill = () => {
    const dataToSave = {
      customerName,
      customerPhone,
      cartDetails: bill.cartDetails,
      totalPrice: bill.totalPrice,
      gstPrice: bill.gstPrice
    };
  
    console.log('Saving bill with data:', dataToSave); // Log the data to be saved
  
    axios.post('http://localhost:5000/api/machines/save', dataToSave)
      .then(response => {
        alert('Bill saved successfully!');
        setError(null); // Clear previous errors

        // Clear the bill data from frontend
        setBill({
          ...bill,
          cartDetails: [], // Empty the cart details
          totalPrice: 0,
          gstPrice: 0
        });

        // Optional: Clear customer details
        setCustomerName('');
        setCustomerPhone('');
      })
      .catch(error => {
        console.error('Error saving bill:', error);
        setError('Failed to save bill. Please try again later.');
      });
  };
  
  if (error) return <div>{error}</div>;
  if (!bill) return <div>Loading...</div>;

  // Helper function to format currency
  const formatCurrency = (amount) => {
    return amount ? `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '₹0.00';
  };

  // Helper function to format GST percentage
  const formatGST = (percentage) => {
    const cgst = percentage / 2; // Assuming the GST is divided equally between CGST and SGST
    return `${cgst}% CGST and ${cgst}% SGST`;
  };

  return (
    <div className="bill-container">
      <div className="shop-info">
        <h1>Masuca Pump</h1>
        <p>Boro Taldanga, Chandannagar, Hooghly-71236</p>
        <p>Phone: +9830559489</p>
      </div>
      <div className="bill-header">
        <h2>Invoice</h2>
      </div>
      <div className="customer-details">
        <label>
          Customer Name:
          <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
        </label>
        <label>
          Customer Phone:
          <input type="text" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />
        </label>
      </div>
      <h3>Cart Details:</h3>
      <table className="bill-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Sell Price</th>
            <th>Total Price</th>
            <th>GST Price</th>
            <th>Action</th> {/* Added Action column */}
          </tr>
        </thead>
        <tbody>
          {bill.cartDetails && bill.cartDetails.length > 0 ? (
            bill.cartDetails.map(item => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{formatCurrency(item.sellPrice)}</td>
                <td>{formatCurrency(item.totalPrice)}</td>
                <td>{formatCurrency(item.gstPrice)}</td>
                <td>
                  <button onClick={() => handleDelete(item._id, item.quantity)}>Delete</button> {/* Delete button */}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No items in the cart</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="bill-footer">
        <h3>Total Bill:</h3>
        <p><strong>Total Price:</strong> {formatCurrency(bill.totalPrice)}</p>
        <p><strong>GST (18%):</strong> {formatGST(18)}</p>
        <p><strong>Total GST:</strong> {formatCurrency(bill.gstPrice)}</p>
      </div>
      <button className="print-button" onClick={handlePrint}>Print Bill</button>
      <button className="save-button" onClick={handleSaveBill}>Save Bill</button> {/* Save button */}
    </div>
  );
};

export default BillPage;
