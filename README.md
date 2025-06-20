# What to Wear (WTWR)

## Project Description

WTWR (What to Wear) is a full-stack web application that helps users decide what to wear based on their local weather conditions. The app fetches real-time weather data from the OpenWeather API and suggests appropriate clothing items from the user's wardrobe. Users can create accounts, manage their personal clothing collections, and can like other users' items.

## Functionality

- User Authentication & Authorization

  - Register and login functionality
  - Protected routes for authenticated users
  - JWT token-based authentication

- Weather Features

  - Real-time weather data integration
  - Dynamic clothing suggestions based on temperature
  - Temperature unit conversion (Fahrenheit/Celsius)

- Clothing Management

  - Add and delete clothing items
  - Upload image links for clothing items
  - Like/unlike clothing items

- User Management

  - Update name and profile
  - Placeholder avatar generated if image failed

- Responsive Design
  - Mobile-friendly interface

## Technologies and Techniques Used

### Frontend

- **React** - React Router, React Context
- **Build Tool:** Vite
- **API Integration:** OpenWeather API

### Backend

- **Node.js & Express**
- **MongoDB**
- **Authentication** - JWT tokens
- **Security** - Protected routes, input validation

### Screenshots

<img src="screenshots/screenshot.PNG" width="500px" alt="WTWR main interface">

## Additional Resources

- [OpenWeather API Documentation](https://openweathermap.org/api/one-call-3#example)
- [Backend Repository](https://github.com/willmarl/se_project_express)
