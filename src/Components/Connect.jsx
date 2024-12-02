import React, { useState, useEffect } from 'react';
import '../Style/Connect.css';
import Doctorcard from './Doctorcard';

export default function Connect() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Make the API request when the component mounts
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/users/doctor');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data.data)
        setDoctors(data.data); // Assuming the API response contains an array of doctor objects
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className='CONNECT'>
      <h1>Our Doctors</h1>
      
      <div className="doctors-list">
       {
        doctors.map((doctor) => { 
          return(
            <Doctorcard doctor={doctor} key={doctor._id}/>    
          )

       })
      }
      </div>
    </div>
  );
}
// TODO connect page 