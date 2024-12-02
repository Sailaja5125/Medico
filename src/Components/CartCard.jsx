import React, { useEffect } from 'react';
import '../Style/Cart.css';

export default function CartCard({ cartItems}) {
  const handleRemoveItem = async (id) => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/cart/removecart', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':`${localStorage.getItem('auth-token')}`
        },
        body: JSON.stringify({ id }), 
      });

      if (response.ok) {
        console.log(`Item with ID ${id} removed successfully.`);
        // callint get products function
      } else {
        console.error('Error removing item:',response.status);
      }
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };
  
  return (
    <div>
      <div className="card cart">
        <div className="products">
            <div className="product" key={cartItems.product._id}>
              <img
                src={cartItems.product.image}
                alt={cartItems.product.name}
                style={{ width: '60px', height: '60px' }}
              />
              <div>
                <span>{cartItems.product.name}</span>
                <p>{cartItems.product.description}</p>
              </div>
              <label className="price small">Rs{cartItems.product.price}</label>
              <button onClick={()=>handleRemoveItem(cartItems.product._id)}>Remove</button>
            </div>
        </div>
      </div>
    </div>
  );
}
// leave this part 