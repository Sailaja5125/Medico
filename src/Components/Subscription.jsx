import React from 'react'
import '../Style/Subscription.css'
function Subscription() {
  return (
    <div>
      <div className="subscribe-container">
        <div className="subscribe-header">
           <h1>Join Us</h1>
           <p>Problems trying to resolve the conflict between 
           the two major realms of Classical physics: Newtonian mechanics </p>
        </div>
        <div className="subscription-form">
           <input type="email" className="email" />
           <button className='subscription-btn' placeholder='Email'>Subscribe </button>
        </div>
      </div>
    </div>
  )
}

export default Subscription
