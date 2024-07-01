import React, { useState } from 'react';
import './App.css';
import axios from 'axios'; // Import Axios for HTTP requests

function App() {
  const initialData = [
    {
      productName: 'Apple iPhones',
      phoneNumber: '123-456-7890',
      email: 'juukohenry@gmail.com',
      quantity: 10,
      amount: "200000",
      status: 'pending',
      trackingCode: 'ABC123'
    }
  ];

  const [code, setCode] = useState('');
  const [data, setData] = useState(initialData);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state for API call

  const handleInputChange = (event) => {
    setCode(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      // Fetch data from API based on the tracking code
      const response = await axios.get(`http://localhost:5000/customer/get?trackingCode=${code}`);
      setData(response.data); // Assuming API returns an array of data
      setFilteredData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error, show a message, etc.
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFilteredData([]);
    setCode('');
  };

  return (
    <div className="App">
      <h1>Delivery Status Update</h1>
      <form onSubmit={handleSubmit}>
        <label className='m-4'>Enter Tracking Code</label>
        <input 
          className='form-control' 
          name="product" 
          value={code}
          onChange={handleInputChange}
        />
        <input type='submit' name="submit" value="Submit" className='m-3' disabled={loading} />
        <button type="button" onClick={handleClear}>Clear</button>
      </form>
      {loading && <p>Loading...</p>}
      <table className="styled-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Invoice</th>
          </tr>
        </thead>
        <tbody>
          {(filteredData.length > 0 ? filteredData : data).map((item, index) => (
            <tr key={index}>
              <td>{item.productName}</td>
              <td>{item.phoneNumber}</td>
              <td>{item.email}</td>
              <td>{item.quantity}</td>
              <td>{item.status}</td>
              <td>UGX {item.amount}</td>
            </tr>
          ))}
          {filteredData.length === 0 && !loading && (
            <tr>
              <td colSpan="6">No matching records found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
