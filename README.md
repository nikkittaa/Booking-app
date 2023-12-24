# Airbnb Clone

## Description

This project is an Airbnb clone, a web application that allows users to discover and book accommodations worldwide. It replicates the core functionality of the Airbnb platform, enabling users to search for properties, view property details, and make reservations.

## Features

- **User Authentication:** Users can create accounts, log in, and manage their profiles.
- **Property Listings:** Browse and search for available properties.

- ![image](https://github.com/nikkittaa/Booking-app/assets/119802510/f62682a7-43be-4e13-85d8-41b28be07f9f)

- **Property Details:** View detailed information about each property, including descriptions, amenities, and photos.

- ![image](https://github.com/nikkittaa/Booking-app/assets/119802510/cb70c1de-c2c0-4cfd-aa37-57e4ad4700a2)
- ![image](https://github.com/nikkittaa/Booking-app/assets/119802510/31c895b0-e925-40d7-9af4-34d082ce1127)


- **Booking System:** Users can make reservations for selected properties and manage their booking history.
- **Host Functionality:** Property owners can list their accommodations, manage bookings, and update property information.

![image](https://github.com/nikkittaa/Booking-app/assets/119802510/b86bddb7-1cfd-4509-8a37-0147e6b96020)

![image](https://github.com/nikkittaa/Booking-app/assets/119802510/f9fbb300-389e-460b-9300-6cd296612fa3)

![image](https://github.com/nikkittaa/Booking-app/assets/119802510/04ea96c0-d576-44c2-adf5-338a30814eeb)




## Technologies Used

- **Frontend:** React.js, Tailwind CSSfor styling.
- **Backend:** Node.js, Express.js, MongoDB for data storage.
- **Authentication:** JSON Web Tokens (JWT).

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/nikkittaa/booking-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd booking-app
   ```

3. Install dependencies for the frontend and backend:

   ```bash
   # Install frontend dependencies
   cd client
   npm install

   # Install backend dependencies
   cd ../api
   npm install
   ```

4. Set up environment variables:

   - Create a `.env` file in the `server` directory with the required environment variables (e.g., MongoDB connection string).

5. Start the development server:

   ```bash
   # Start the frontend server
   cd client
   npm run dev

   # Start the backend server
   cd ../api
   nodemon index.js
   ```

6. Open your browser and go to [http://localhost:5173] to access the Airbnb clone.


