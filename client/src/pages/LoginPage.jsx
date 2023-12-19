import React from 'react'
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const LoginPage = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  const {setUser} = useContext(UserContext);
  async function handleLoginSubmit(event){
    event.preventDefault();

    try{
      const response = await axios.post('/login', {email, password});
      setUser(response.data);
      setRedirect(true);
      navigate('/');
      alert("Logged in successfully!");
    }catch(e){
      alert('Login failed!');
    }
    
   
   
  }
  return (
    <div className = "mt-4 grow flex items-center justify-around">
    <div className = "mb-64">
    <h1 className = "text-4xl text-center mb-4">Login</h1>
      <form className = "max-w-md mx-auto" onSubmit = {handleLoginSubmit}>
        <input type = "email" placeholder = "your@email.com" value = {email} onChange = {e => setEmail(e.target.value)}/>
        <input type = "password" placeholder = "password" value = {password} onChange = {e => setPassword(e.target.value)}/>
        <button className = "primary">Login</button>
        <div className = "text-center py-2 text-gray-500">Don't have an account yet? <Link className = "underline text-black" to = {'/register'}>SignUp</Link>
        </div>
      </form>
      </div>
    </div>
  )
}

export default LoginPage;