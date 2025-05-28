# E-Store: Full-Stack E-Commerce Web Application

> ⚠️ **NOTE:** This site is hosted on a free Render instance. The first API request may take **50–60 seconds** due to server cold start, as the platform puts the backend to sleep when inactive.

Visit the live site here 👉 [eStore Live](https://e-store-n221.onrender.com/)

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Testing](#testing)
- [Payment Information](#payment-information)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Deployment](#deployment)


![eStore Screenshot](public/screenshot.png)



## Overview

**E-Store** is a full-stack eCommerce web application built using the MERN stack. The application offers a seamless shopping experience with features like product browsing, filtering by categories, product ratings, and a secure order system. It has a fully responsive design to ensure an optimal user experience across all devices. Both frontend and backend are separately deployed on [Render.com](https://render.com).

## Features

- **User Authentication**: Secure registration and login system.
- **Product Listings**: Products displayed by categories, including electronics, fashion, beauty, and more.
- **Product Search**: Real-time search with filtering and normalization (lowercase, no spaces).
- **Product Rating System**: Users can rate products, and the app shows average ratings.
- **Cart and Checkout**: Add products to the cart, and proceed with order checkout.
- **Order Management**: Users can view their past orders, and sellers can manage orders.
- **File Uploads**: Images uploaded directly to the public folder via Multer.
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices.


## Testing

To test the application, you can use the following credentials:

### User Login
- **Email**: `testuser1@gmail.com`
- **Password**: `testuser1`

### Seller Login
- **Email**: `rohitkushwaha.developer@gmail.com`
- **Password**: `rohitDeveloper`


## Payment Information

To test the payment functionality, you can use the following sample card information:

| Card Network | Card Number         | CVV          | Expiry Date        |
|--------------|---------------------|--------------|---------------------|
| Mastercard   | 5267 3181 8797 5449 | Random CVV   | Any future date     |
| Visa         | 4111 1111 1111 1111 | Random CVV   | Any future date     |

Please ensure to replace "Random CVV" with an actual CVV when testing, as it needs to be a 3-digit number for Visa and a 3 or 4-digit number for Mastercard.



## Technologies Used

### Frontend
- **React.js**: Building the user interface.
- **Redux**: State management for global data handling.
- **React Query**: Fetching and managing data from the backend.
- **CSS**: Styling and layout enhancements for an attractive UI.

### Backend
- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web framework for handling API routes and middleware.
- **MongoDB**: Database for storing user, product, and order data.
- **Mongoose**: ODM for MongoDB to interact with the database.
- **Multer**: Middleware for handling file uploads (images).
- **JWT**: JWT for user authentication using tokens.


### Project Structure

### Backend
Ecomserver ├── public
           ├── .gitignore 
           ├── package.json
           ├── .env 
           ├──  src ├── controllers
                    ├── db
                    ├── middleware
                    ├── models
                    ├── routes 
                    ├── services
                    ├── utils
                    ├── app.js
                    └── server.js

### Frontend
estorefrontend │ └── src │ ├── components │ ├── api │ ├── assets │ ├── reducers │ ├── store │ ├── app.jsx │ ├── app.css │ ├── main.jsx │ └── index.html

### Deployment
- **Render.com**: Frontend and backend deployment.
- **Vite**: Frontend build tool for fast development and deployment.
