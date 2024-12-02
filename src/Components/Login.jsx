import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Style/Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const json = await response.json();
      console.log(json);
      if (json.success) {
        console.log('logged in', json.data.access_token);
        localStorage.setItem('auth-token', json.data.access_token);
        localStorage.setItem('user', JSON.stringify(json.data.user));
        navigate('/'); // Redirect to a dashboard or home page after login
      } else {
        console.log('login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className='body'>
      <div className="logincontainer">
        <div className="heading">Login</div>
        <form className="loginform" onSubmit={handleSubmit}>
          <input
            placeholder="E-mail"
            id="email"
            name="email"
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            placeholder="Password"
            id="password"
            name="password"
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span className="forgot-password"><a href="#">Forgot Password ?</a></span>
          <input value="Login" type="submit" className="login-button" />
        </form>
      </div>
    </div>
  );
}
