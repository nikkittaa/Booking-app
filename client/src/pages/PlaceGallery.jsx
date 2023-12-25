import React , {useState} from 'react'

const PlaceGallery = ({place}) => {
    const [showAllPhotos, setShowAllPhotos] = useState(false);

    if (showAllPhotos) {
        return (
            <div className = "absolute inset-0 bg-black text-white  min-h-screen">
            <div className = "bg-black p-8 grid gap-4">
            <div>
                <h2 className='text-3xl mr-48'>Photos of {place.title}</h2>
                <button onClick = {() => setShowAllPhotos(false)}className = "fixed right-12 top-8 flex gap-4 px-4 py-2 rounded-2xl shadow shadow-black">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                </svg>

                Close photos</button>
            </div>
            {place?.photos?.length > 0 && place.photos.map(photo => (
                    <div className = "m-6">
                        <img src = {'http://localhost:4000/uploads/' + photo}/>
                    </div>
                ))}
            </div>
                
            </div>
        )
    }
    
  return (
    <div className='relative'>
    <div className = "grid gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden">
        <div>
            {place.photos?.[0] && (
                <div >
                <img onClick = {() => setShowAllPhotos(true)} className = "cursor-pointer aspect-squae object-cover" src = {'http://localhost:4000/uploads/'+place.photos[0]}/>
                </div>
                
            )}
        </div>
        <div className = "grid">
            {place.photos?.[1] && (
                <img onClick = {() => setShowAllPhotos(true)} className = "cursor-pointer aspect-squae object-cover" src = {'http://localhost:4000/uploads/'+place.photos[1]}/>
            )}
            <div className = "overflow-hidden">
            {place.photos?.[2] && (
                <img onClick = {() => setShowAllPhotos(true)} className = "cursor-pointer aspect-squae object-cover relative" src = {'http://localhost:4000/uploads/'+place.photos[2]}/>
            )}
            </div>
        </div>
        <button onClick = { () => setShowAllPhotos(true)} className = "flex gap-1 absolute bottom-2 right-2 p-2 rounded-2xl bg-white shadow shadow-md shadow-gray-100">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>

        Show more photos</button>

    </div>
    </div>
  )
}

export default PlaceGallery