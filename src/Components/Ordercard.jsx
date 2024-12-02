import React, { useState } from 'react';
import '../Style/Ordercard.css';
import Payment from './Payment';

export default function Ordercard({ product, closeModal }) {
  // State variables to handle form data
  const [address, setAddress] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [deliveryDate, setDeliveryDate] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data for the request
    const requestData = {
      name: product.name,
      address,
      quantity,
    };

    try {
      // Sending the request
      const response = await fetch('http://localhost:5000/api/v1/order/placeOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':`${localStorage.getItem('auth-token')}`,
          'id': product.id
        },
        body: JSON.stringify(requestData),
      });
      // Handling the response
      if (response.ok) {
        alert('Order placed successfully!');
        closeModal(); // Close the modal on success
      } else {
        throw new Error('Failed to place order.');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="OrderCard">
      <div className="modal">
        <form className="orderform" onSubmit={handleSubmit}>
          <Payment />
          <div className="separator">
            <hr className="line" />
            <p>Enter the address</p>
            <hr className="line" />
          </div>
          <div className="credit-card-info--form">
            <div className="input_container">
              <label htmlFor="address_field" className="input_label">
                Full address
              </label>
              <input
                id="address_field"
                className="input_field"
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="input_container">
              <label htmlFor="quantity_field" className="input_label">
                Quantity
              </label>
              <input
                id="quantity_field"
                className="input_field"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>
            <div className="input_container">
              <label htmlFor="delivery_date_field" className="input_label">
                Delivery Date
              </label>
              <div className="split">
                <input
                  id="delivery_date_field"
                  className="input_field"
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          <button className="purchase--btn" type="submit">
            Checkout
          </button>
        </form>
      </div>
    </div>
  );
}
