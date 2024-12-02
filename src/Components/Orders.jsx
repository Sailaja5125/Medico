import React, { useState, useEffect } from 'react';
import '../Style/Cart.css';
import '../Style/Orders.css'
export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from the API
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/order/getorders', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${localStorage.getItem('auth-token')}`,
          },
        });
        if (!response.ok) {
          throw new Error('Error fetching orders');
        }
        const data = await response.json();
        setOrders(data.data); // Set the retrieved orders in state
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className='Orders'>
      <h3>Shipping Address</h3>
      <p>{orders[0]?.address}</p> {/* Assuming there's only one order */}
      <h3>Delivered by {new Date(orders[0]?.order_date).toLocaleString()}</h3>
      {orders.map((order) => (
        <div className="card cart" key={order._id}>
          <div className="products">
            <div className="product">
              <div>
                <span>{order.products[0]?.product.name}</span> {/* Assuming there's only one product */}
                <p>Quantity: {order.quantity||1}</p>
              </div>
              <label className="price small">${order.products[0]?.product.price}</label>
              <button>Cancel Order</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
