# Node.js REST API with Express, MongoDB, and JWT Authentication

This is a Node.js REST API project built with the Express framework, MongoDB for data storage, and JWT authentication to secure routes. The API includes user registration, login, and role-based authorization. Users need to register and log in to obtain a JWT token, which is then used for subsequent requests by including it in the request header's authorization field.

## Features

- User Registration: Create a new user account with a unique username and password.
- User Login: Authenticate users and provide a JWT token upon successful login.
- Role-Based Authorization: Implement user and admin roles for different levels of access.
- MongoDB Integration: Store user data and other relevant information in a MongoDB database.
- JSON File Backup: Backup important data to a local JSON file for redundancy.


### Prerequisites

- Node.js and npm installed.
- MongoDB server running locally or accessible via a connection string.
- Postman or a similar API testing tool for sending requests.
