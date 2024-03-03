import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Pagination, Form } from 'react-bootstrap';


function App() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('ASC');
  const [sortOrder1, setSortOrder1] = useState('ASC');
  const[currentPage,setcurrentpage]=useState(1)
  const [loading,setLoading]=useState(true)

  useEffect(() => {
    fetchCustomers();
  }, [sortBy, sortOrder,currentPage,searchTerm]);
 
  const fetchCustomers = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`http://localhost:5000/customers?page=${currentPage}&sortBy=${sortBy}&sortOrder=${sortOrder}&searchTerm=${searchTerm}&sortOrder1=${sortOrder1}`);
      setCustomers(response.data);
      setLoading(false)
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setcurrentpage(1)
    console.log(event.target.value)

    
  };


  const handleOrderChange = () => { 
    setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC');
    setSortBy('date')
  };
  const handleOrderChange1=()=>{
    setSortOrder1(sortOrder1 === 'ASC' ? 'DESC' : 'ASC');
    setSortBy("time")

  }
  

  return (
    <div className="container">
      <h1>Customer List</h1>
      <Form.Group>
        <Form.Control type="text" placeholder="Search by name or location" value={searchTerm} onChange={handleSearch} />
      </Form.Group>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>SNo</th>
            <th>
              Name
            </th>
            <th>Age</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Date <button className="btn btn-link" onClick={handleOrderChange}>{sortOrder === 'ASC' ? '▲' : '▼'}</button></th>

            <th>Time<button className="btn btn-link" onClick={handleOrderChange1}>{sortOrder1 === 'ASC' ? '▲' : '▼'}</button></th>
          </tr>
        </thead>
        {!loading&&<tbody>
          {customers.map((customer, index) => (
            <tr key={index}>
              <td>{customer.sno}</td>
              <td>{customer.customer_name}</td>
              <td>{customer.age}</td>
              <td>{customer.phone}</td>
              <td>{customer.location}</td>
              <td>{customer.date}</td>
              <td>{customer.time}</td>
            </tr>
          ))}
        </tbody>}
      </Table>
      <Pagination>
        <Pagination.Prev onClick={() => {setcurrentpage(Math.max(currentPage - 1, 1))}} />
        <Pagination.Item active>{currentPage}</Pagination.Item>
        <Pagination.Next onClick={() => {setcurrentpage(currentPage + 1)}} />
      </Pagination>
    </div>
  );
}

export default App;

