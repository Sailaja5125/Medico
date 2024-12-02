import React, { useState, useEffect } from "react";
import "../Style/Cart.css";
import CartCard from "./CartCard";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);


  const fetchAllItems = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/cart/getcartitems",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("auth-token")}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setCartItems(data.data.products); // Set the fetched cart items in state
        setTotalPrice(data.data.total_price)

      } else {
        console.error("Error fetching cart items:", response.status);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    fetchAllItems();
  }, []);

  return (
    <div className="Cart">
      <div className="master-container">
        <label className="title">Your cart</label>
        {cartItems.map(items => (
              <CartCard cartItems={items} key={items._id} />
          )
        )}
      </div>
      <div className="card checkout">
        <div className="card checkout">
          <label className="title">Checkout</label>
          <div className="details">
            <span>Your cart total:</span>
            <span>{totalPrice}</span>
          </div>
          <div className="checkout--footer">
            <label className="price">
              {totalPrice}
            </label>
            <button className="checkout-btn">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
}
