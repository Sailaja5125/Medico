import React, { useState } from 'react';
import '../Style/Productcard.css';
import Ordercard from './Ordercard';

export default function Productcard({ product }) {
  // State to manage the modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!product) {
    return null; // Return null if product is undefined
  }

  const handleAddToCart = async () => {
    console.log(product._id);
    try {
      const response = await fetch('http://localhost:5000/api/v1/cart/addcart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('auth-token')}`,
        },
        body: JSON.stringify({
          id: product._id,
          quantity: 1, // Default quantity
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      console.log('Product added to cart successfully!');
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  // Function to open the modal
  const handleBuyNow = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="card-container">
      <div className="card-image" style={{ border: 'none' }}>
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: '12.3rem',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
            }}
          />
        ) : (
          <div className="placeholder-image">No Image</div>
        )}
      </div>
      <div className="card-icons">
        <i className="fa-regular fa-heart"></i>
        <i className="fa-solid fa-cart-shopping" onClick={handleAddToCart}></i>
      </div>
      <div className="card-content">
        <h4>{product.name}</h4>
        <p>{product.description}</p>
        <h6>Rs.{product.price}</h6>
        <button onClick={handleBuyNow}>Buy now</button>
      </div>

      {/* Modal to display Ordercard */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <Ordercard product={product} closeModal={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
}
