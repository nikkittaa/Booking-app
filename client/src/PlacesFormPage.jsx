import React, {useState} from 'react';
import Perks from './Perks';
import PhotoUploader from './PhotoUploader';
import axios from 'axios';
import AccountNav from './pages/AccountNav';
import { Navigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

const PlacesFormPage = () => {
    const {id} = useParams();
    const [ title, setTitle] = useState();
    const [address, setAddress] = useState();
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription ] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [redirect, setRedirect] = useState(false);
     
    useEffect(() => {
        if(!id){
            return;
        }
        axios.get('/places/'+id).then(response => {
            
            const {data} = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
        });
    }, [id]);
    async function savePlace(ev){
       
        ev.preventDefault();

        const placeData = { title, address, addedPhotos, 
            description, perks, extraInfo,
             checkIn, checkOut, maxGuests};

        if(id){
            await axios.put('/places', {id, ...placeData});
            setRedirect(true);
        }else{
        await axios.post('/places', placeData);
        setRedirect(true);
        }
    }
    
    if(redirect){
        return <Navigate to = {'/account/places'}/>
    }

  return (
    <div>
    <AccountNav/>
        <form className = "m-4" onSubmit = {savePlace}>
            <h2 className = "text-2xl mt-4">Title</h2>
            <p className = "text-gray-500 text-sm">Title/Heading for your place, should be short an catchy</p>
            <input type  = 'text' placeholder = 'title, for example: My lovely apartment' value = {title} onChange = {event => setTitle(event.target.value)}/>
                    <h2 className = "text-2xl mt-4"> Address</h2>
                    <p className = "text-gray-500 text-sm">Address to this place</p>
                    <input type = 'text' placeholder = 'address' value = {address} onChange = {event => setAddress(event.target.value)}/>
                    <h2 className = "text-2xl mt-4">Photos</h2>
                    <p className = "text-gray-500 text-sm">More equals better</p>
                    <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
                    <h2 className = "text-2xl mt-4">Description</h2>
                    <p className = "text-gray-500 text-sm">Description of the place</p>
                    <textarea value = {description} onChange = {event => setDescription(event.target.value)}/>
                    <h2 className = "text-2xl mt-4">Perks</h2>
                    <p className = "text-gray-500 text-sm mb-2">Select all the perks of the place</p>
                    <Perks selected = {perks} onChange = {setPerks}/>

                    <h2 className = "text-2xl mt-4">Extra Info</h2>
                    <p className = "text-gray-500 text-sm mb-2">House rules, etc</p>   
                    <textarea value = {extraInfo} onChange = {event => setExtraInfo(event.target.value)}/>
                   
                    <h2 className = "text-2xl mt-4">Check in & out times, max guests</h2>
                    <p className = "text-gray-500 text-sm mb-2">Check in and out times, remember to have the time window for cleaning the room between guests</p>
                    <div className = "grid gap-2 sm:grid-cols-3">
                        <div>
                            <h3 className = "mt-2 mb-1">Check in time</h3>
                            <input type = "text" 
                            placeholder = "14:00" 
                            value = {checkIn} 
                            onChange = {event => setCheckIn(event.target.value)}/>
                        </div>
                        <div>
                            <h3 className = "mt-2 mb-1">Check out time</h3>
                            <input type = "text" placeholder = "22:00" value = {checkOut} onChange = {event => setCheckOut(event.target.value)}/>
                        </div>
                        <div>
                            <h3 className = "mt-2 mb-1" >Maximum number of guests</h3>
                            <input type = "number" placeholder = "5" value = {maxGuests} onChange = {event => setMaxGuests(event.target.value)}/>
                        </div>
                    </div>
                    <button className = "primary my-8">Save</button>
                </form>
            </div>
  )
}

export default PlacesFormPage