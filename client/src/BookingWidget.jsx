import React from 'react'

const BookingWidget = ({place}) => {
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
                                <input type = "date"/>
                            </div>
                            <div className = "my-4 p-4 border-l">
                                <label>Check out:</label>
                                <input type = "date"/>
                            </div>
                        </div>
                            <div className = "my-4 p-4 border-t">
                                <label>Number of guests:</label>
                                <input type = "number" placeholder = "1"/>
                            </div>

                    </div>
                    
                    <button className = "primary my-2">Book this place</button>
                </div>
            </div>
  )
}

export default BookingWidget