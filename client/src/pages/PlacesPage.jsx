import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Perks from '../Perks';
import axios from 'axios';

const PlacesPage = () => {
    const {action} = useParams();
    
    const [ title, setTitle] = useState();
    const [address, setAddress] = useState();
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription ] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    
    async function addPhotoByLink(ev){
        ev.preventDefault();
        const {data: filename} = await axios.post('upload-by-link', {link : photoLink});
        setAddedPhotos(prev => {
            return [...prev, filename]
        });
        
        setPhotoLink('');
        
    }

    function uploadPhoto(event){
        const files = event.target.files;
        const data = new FormData();
        

        for(let i =0 ; i<files.length;i++){
            data.append('photos', files[i]);
        }
        axios.post('/upload', data, {
        headers: {'Content-type': 'multipart/form-data'}
        }).then(response => {
            console.log(response);
            const {data: filenames} = response;
            setAddedPhotos(prev => {
                return [...prev, ...filenames]
            });
        });
    }
    return(
        <div>
        {action !== 'new' && (
            <div className = "text-center">
            <Link className = "inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to = {'/account/places/new'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-slot="icon" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add new place
            </Link>
        </div>
        )}
        {action === 'new' && (
            <div>
                <form className = "m-4">
                    <h2 className = "text-2xl mt-4">Title</h2>
                    <p className = "text-gray-500 text-sm">Title/Heading for your place, should be short an catchy</p>
                    <input type  = 'text' placeholder = 'title, for example: My lovely apartment' value = {title} onChange = {event => setTitle(event.target.value)}/>
                    <h2 className = "text-2xl mt-4"> Address</h2>
                    <p className = "text-gray-500 text-sm">Address to this place</p>
                    <input type = 'text' placeholder = 'address' value = {address} onChange = {event => setAddress(event.target.value)}/>
                    <h2 className = "text-2xl mt-4">Photos</h2>
                    <p className = "text-gray-500 text-sm">More equals better</p>
                    <div className = "flex gap-2">
                        <input type = "text" placeholder = {"Add using link...jpg"} value = {photoLink} onChange = {event => setPhotoLink(event.target.value)}/>
                        <button className = "bg-gray-200 px-4 rounded-2xl" onClick = {addPhotoByLink}>Add&nbsp;photo</button>
                    </div>
                    
                    <div className = "mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                        {addedPhotos.length > 0 && addedPhotos.map(link => (
                                <div className = 'h-32 flex'>
                                    <img className = "rounded-2xl w-full object-cover" src = {'http://localhost:4000/uploads/'+link} alt = "place"/>
                                    {console.log('http://localhost:4000/uploads/'+link)}
                                </div>
                        ))}
                        <label className = "h-32 flex items-center gap-1 border my-2 bg-transparent rounded-2xl p-8 text-2xl text-gray-600 cursor-pointer">
                        <input type = "file" multiple className = "hidden" onChange= {uploadPhoto}/>
                           Upload
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" dataSlot="icon" className="w-8 h-8">
                                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                            </svg>
                        </label>
                    </div>
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
        )}
            my places
        </div>
    );
}

export default PlacesPage;