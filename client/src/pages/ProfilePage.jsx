import React, { useState } from 'react';
import { UserContext } from '../UserContext';
import { useContext } from 'react';
import {  useParams , useNavigate} from 'react-router-dom';
import axios from 'axios';

import PlacesPage from './PlacesPage';
import AccountNav from './AccountNav';

const ProfilePage
 = () => {
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
        setUser(null);
      });
      
    
  }

  if(!ready){
    return 'Loading...';
  }

  if(ready && !user && !redirect){
    navigate('/login');
  }
  
  if(redirect !== null){
    navigate(redirect);
  }
  
  return (
    <div>
      <AccountNav/>
      {subpage === "profile" && (
        <div className = "text-center max-w-lg mx-auto">
          Logged in as {user.name } ({user.email})<br/>
          <button onClick = {logout} className = "primary max-w-sm m-2">Logout</button>
        </div>
      )}
      
    </div>
  )
}

export default ProfilePage
