import React, { useState, useEffect } from 'react';
import '../Style/Shop.css';
import Productcard from './Productcard';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchAllProducts = async () => {
    try {
      const token = localStorage.getItem('auth-token');
      if (!token) {
        throw new Error('No token found');
      }
      const response = await fetch('http://localhost:5000/api/v1/shop/getproducts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      setProducts(data.data || []); // Ensure products is an array
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const searchProducts = async (search) => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/shop/searchproducts?search=${search}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      setProducts(data.data || []); // Ensure products is an array
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      searchProducts(searchTerm);
    } else {
      fetchAllProducts();
    }
  };

  return (
    <div className='SHOP'>
      <div className="small-nav">
        <a href="/cart">Cart</a>
        <a href="/orders">Orders</a>
      </div>
      <div className="shop-header">
        <h1>Products</h1>
        <input
          type="search"
          placeholder='search'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-btn" onClick={handleSearch}>Search</button>
      </div>
      <div className="product-showcase">
        {products.map(product => (
          <Productcard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
// TODO : create a cart and orders and create a modal for buy now to fill all the details i.e create orders and display orders in orders page and add cancel orders button