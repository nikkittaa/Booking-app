import React, { useContext, useState } from 'react'
import {differenceInCalendarDays} from 'date-fns';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import { useEffect } from 'react';
const BookingWidget = ({place}) => {

    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [ numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [redirect, setRedirect] = useState('');
    const {user} = useContext(UserContext);

    useEffect(()=>{
        if(user){
            setName(user.name);
        }
    }, [user]);
    let numberOfDays = 0;
    if(checkIn && checkOut){
        numberOfDays =differenceInCalendarDays(new Date(checkOut), new Date(checkIn)) ;
    }

    async function bookThisPlace(){
        const price = numberOfDays*place.price;
        const placeId = place._id;
        const book = {placeId, checkIn, checkOut, numberOfGuests, name, mobile, price };
        const response = await axios.post('/bookings', book);
        const bookingId = response.data._id;
        setRedirect(`/account/bookings/${bookingId}`);
    }
    
    if(redirect){
        return <Navigate to = {redirect}/>
    }
  return (
    <div>
                <div className = "bg-white shadow  p-4 rounded-2xl">
                    <div className = "text-2xl text-center">
                    Price: ₹{place.price} / per night
                    </div>
                    <div className = "  border rounded-2xl mt-4">
                        <div className='flex'>
                            <div className = "my-4  p-4 ">
                                <label>Check in:</label>
                                <input type = "date" 
                                    value = {checkIn} 
                                    onChange = {ev => setCheckIn(ev.target.value)}/>
                            </div>
                            <div className = "my-4 p-4 border-l">
                                <label>Check out:</label>
                                <input type = "date" 
                                    value = {checkOut} 
                                    onChange = {ev => setCheckOut(ev.target.value)}/>
                            </div>
                        </div>
                            <div className = "my-4 p-4 border-t">
                                <label>Number of guests:</label>
                                <input type = "number" placeholder = "1"   
                                        value = {numberOfGuests} 
                                        onChange = {ev => setNumberOfGuests(ev.target.value)}/>
                            </div>
                            {
                                numberOfDays > 0 && (
                                    <div className = "py-3 px-4 border-t">
                                        <label>Your Full Name:</label>
                                        <input type = "text"
                                            value = {name} onChange = {ev => setName(ev.target.value)}/>
                                        <label>Phone Number:</label>
                                        <input type = "tel"
                                            value = {mobile} onChange = {ev => setMobile(ev.target.value)}/>
                                    </div>
                                )
                            }
                    </div>
                    
                    <button onClick = {bookThisPlace} className = "primary my-2">Book this place
                    {numberOfDays > 0  && (
                        <span> <br/>
                        ₹{numberOfDays * place.price} for {numberOfDays} nights</span>
                    )}
                    </button>
                </div>
            </div>
  )
}

export default BookingWidget