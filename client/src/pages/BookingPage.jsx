import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import AddressLink from './AddressLink';
import PlaceGallery from './PlaceGallery';
import { format, differenceInCalendarDays } from 'date-fns';
import { Link } from 'react-router-dom';
const BookingPage = () => {
    const {id} = useParams();
    const [booking, setBookings] = useState('');
   
    useEffect(() => {
        if(id){
            axios.get('/bookings').then(response => {
                const foundBooking = response.data.find(({_id}) => _id === id);
                if(foundBooking){
                    setBookings(foundBooking);
                }
            });
        }
    }, [id]);

    if(!booking){
        return '';
    }
  return (
    <div className='my-8'>
        <h1 className = "text-3xl mb-2">{booking.placeId.title}</h1>
        <AddressLink className = "flex my-2 block" place = {booking.placeId}/>
        <div className = "bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
            
            
            <div className = " pr-8 border-r border-gray-500">
            <h2 className = "text-2xl mb-4">Your booking information</h2>
            <div className = "flex gap-1 items-center  border-t border-gray-300 mt-2 py-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                    </svg>
                    
                    {format(new Date(booking.checkIn), 'yyyy-MM-dd')} &rarr; 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                    </svg>
                    {format(new Date(booking.checkOut), 'yyyy-MM-dd')}
                </div>
            </div>

            <div>
            <div className = "text-xl bg-primary p-6 text-white rounded-2xl">
                    <div>Total Price:</div>
                    <div className = "text-3xl"> ₹{booking.price}</div>
                    
                </div>
            </div>
            
        </div>
        
        <PlaceGallery place = {booking.placeId}/>

        <button className = "my-8 primary">
        <Link to = {'/account/bookings'} className = "grow">Back</Link></button>
    </div>
  )
}

export default BookingPage