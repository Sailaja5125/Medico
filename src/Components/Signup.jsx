import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../Style/Signup.css';

export default function Signup() {
    const [details, setDetails] = useState({ username: "", email: "", password: "", cpassword: "", occupation: "" });
    const [avatar, setAvatar] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('username', details.username);
        formData.append('email', details.email);
        formData.append('password', details.password);
        formData.append('occupation', details.occupation);
        formData.append('avatar', avatar);

        try {
            const response = await fetch(`http://localhost:5000/api/v1/users/register`, {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error: ${response.status} ${response.statusText} - ${errorText}`);
            }

            const json = await response.json();
            console.log(json);

            if (json.success) {
                localStorage.setItem("auth-token", json.token);
                console.log("registered");
                navigate("/login");
            } else {
                console.log("not registered");
            }
        } catch(error){
            console.error("Error during registration:", error);
        }
    };

    const handleChange = (event) => {
        setDetails({
            ...details,
            [event.target.name]: event.target.value
        });
    };

    const handleFileChange = (event) => {
        setAvatar(event.target.files[0]);
    };

    return (
        <div className='body'>
            <form className="form" onSubmit={handleSubmit}>
                <p className="title">Register</p>
                <p className="message">Signup now and get full access to our app.</p>
                <label>
                    <input  type="text" className="input" onChange={handleChange} value={details.username} name='username' required/>
                    <span>Username</span>
                </label>
                <label>
                    <input  type="email" className="input" onChange={handleChange} value={details.email} name='email' required/>
                    <span>Email</span>
                </label>
                <label>
                    <input  type="password" className="input" onChange={handleChange} value={details.password} name='password' required/>
                    <span>Password</span>
                </label>
                <label>
                    <input  type="password" className="input" onChange={handleChange} value={details.cpassword} name='cpassword' required/>
                    <span>Confirm password</span>
                </label>
                <label>
                    <input  type="text" className="input" onChange={handleChange} value={details.occupation} name='occupation' required/>
                    <span>Occupation</span>
                </label>
                <label>
                    <input  type="file" className="input" onChange={handleFileChange} name='avatar' required/>
                    <span>Avatar</span>
                </label>
                <button className="submit">Submit</button>
                <p className="signin">Already have an account? <a href="/login">Login</a></p>
            </form>
        </div>
    );
}
