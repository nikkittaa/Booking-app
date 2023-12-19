import React, { useState } from 'react';
import { UserContext } from '../UserContext';
import { useContext } from 'react';
import { Link, useParams , useNavigate} from 'react-router-dom';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const AccountPage = () => {
  const [redirect, setRedirect] = useState(null);
  const {ready, user, setUser} = useContext(UserContext);
  const navigate = useNavigate();

  let {subpage} = useParams();
  if(subpage === undefined){
    subpage = 'profile';
  }

  function logout(){
    axios.post('/logout')
      .then(() => {
        setRedirect('/');
      });
      
    
  }

  if(!ready){
    return 'Loading...';
  }

  if(ready && !user && !redirect){
    navigate('/login');
  }
  /*
  if(redirect !== null){
    navigate(redirect);
  }
  */
  function linkClasses(type = null){
    if(subpage === type){
      return 'py-2 px-6 bg-primary text-white rounded-full';
    }
    else{
      return 'py-2 px-6';
    }
  }

 

  return (
    <div>
      <nav className = "w-full flex  justify-center m-8 gap-2">
        <Link className = {linkClasses('profile')} to = {'/account'}>My Profile</Link>
        <Link className = {linkClasses('bookings')} to  = {'/account/bookings'}>My Bookings</Link>
        <Link className = {linkClasses('places')} to = {'/account/places'}>My accomodations</Link>
      </nav>
      {subpage === "profile" && (
        <div className = "text-center max-w-lg mx-auto">
          Logged in as {user.name } ({user.email})<br/>
          <button onClick = {logout()} className = "primary max-w-sm m-2">Logout</button>
        </div>
      )}
    </div>
  )
}

export default AccountPage;