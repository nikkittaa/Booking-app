import React, { useState , useEffect} from 'react'
import {  useParams } from 'react-router-dom';
import axios from 'axios';
import BookingWidget from '../BookingWidget';
import PlaceGallery from './PlaceGallery';
import AddressLink from './AddressLink';


const PlacePage = () => {
    const { id } = useParams();
    const [place, setPlace] = useState(null);
    
    useEffect(() => {
        if(!id) return;
        axios.get('/places/'+id).then(response => {
            setPlace(response.data);
        });
        
    }, [id]);

    if(!place) return '';
    

  return (
    <div className = "mt-4 pt-8 bg-gray-50 -mx-8 px-8">
        <h1 className='text-3xl'>{place.title}</h1>
        <AddressLink place = {place}/>
        <PlaceGallery place = {place}/>
        <div className = "my-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">

            <div>
                <div className = "my-4">
                    <h2 className = "font-semibold text-2xl">Description</h2>
                {place.description}
                 </div>
                Check-In: {place.checkIn}<br/>
                Check-Out: {place.checkOut}<br/>
                Max number of guests: {place.maxGuests}
            </div>
            <div>
            <BookingWidget place = {place}/>
            </div>
        </div>
        <div className = "bg-white -mx-8 p-8 border-t">
            <div className = "my-4">
                <h2 className = "font-semibold text-2xl">Extra Info</h2>
            </div>
            <div className = "mb-2 mt-2 text-sm text-gray-700 leading-5">{place.extraInfo}</div>
        </div>
       
    </div>
  )
}

export default PlacePage