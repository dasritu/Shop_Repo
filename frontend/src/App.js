import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import AddMachineForm from './components/AddMachineForm';
import ProductSearch from './components/ProductSearch';
import BillPage from './components/BillPage';
 // Import the BillDetails component
import Layout from './components/Layout';
import AllBills from './components/Allbill';
import BillDetails from './components/BillDetails';
import './styles/print.css'; // Import print-specific styles

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-machine" element={<AddMachineForm />} />
          <Route path="/product-search" element={<ProductSearch />} />
          <Route path="/bill" element={<BillPage />} />
          <Route path="/all-bills" element={<AllBills />} />
          <Route path="/bills/:id" element={<BillDetails />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
