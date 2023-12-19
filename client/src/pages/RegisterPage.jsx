import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    async function registerUser(event){
        event.preventDefault();
        try{
        await axios.post('/register', {
            name, 
            email, 
            password
        });
        
        
        alert('Registered Successfully! You can login now!');
        }catch(error){
            alert('Registration failed! Please try again');
        }
    }
  return (
    <div className = "mt-4 grow flex items-center justify-around">
    <div className = "mb-64">
    <h1 className = "text-4xl text-center mb-4" >SignUp</h1>
      <form className = "max-w-md mx-auto" onSubmit = { registerUser }>
        <input type = "text" placeholder = "Adam Eve" value = {name} onChange = {event => setName(event.target.value)}/>
        <input type = "email" placeholder = "your@email.com" value = {email} onChange = {event => setEmail(event.target.value)}/>
        <input type = "password" placeholder = "password" value = {password} onChange = {event => setPassword(event.target.value)}/>
        <button className = "primary">SignUp</button>
        <div className = "text-center py-2 text-gray-500">Already have an account? <Link className = "underline text-black" to = {'/login'}>Login</Link>
        </div>
      </form>
      </div>
    </div>
  )
}

export default RegisterPage