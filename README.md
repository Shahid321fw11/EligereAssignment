# Event Registration Web Form

## Objective
Develop a web form that allows users to register for an event. The form captures essential details and provides a confirmation upon submission on your mail and webApp.

## Features
- **Form Fields:**
  - Full Name
  - Email Address
  - Phone Number
  - Selection of Event Sessions (dropdown)
- **Client-Side Validation:**
  - Ensure all form fields are validated.
  - Email should follow the correct format.
  - Phone numbers should only contain numbers.
- **Confirmation Page:**
  - Upon submission, display a confirmation page summarizing the provided details and a unique registration ID.
- **Server-Side Processing:**
  - Store the registration details in a server-side file or a database, I use MongoDB.
  - Implement basic server-side validation.
- **Confirmation Email (Optional):**
  - Send a confirmation email to the registrant with the details of their registration.

## Technology Stack
- **Frontend:** React, Bootstrap
- **Backend:** Node.js, Express.js, Mongoose
- **Database:** MongoDB
- **Email Service:** Nodemailer

## Deployment
- **Frontend:** Deployed on [Netlify](https://www.netlify.com)
- **Backend:** Deployed on [Render](https://render.com)

## Getting Started

### Prerequisites
- Ensure you have Node.js and MongoDB installed on your system.

### Installation

- Clone this repository to your local machine.
- Make .env in server with these details.
```
MONGO_URI = "Your MONGO URI"
PORT = 8000
EMAIL_USER="Your Email"
EMAIL_PASS="Your Email Passkey" 
```
- Install npm in both server and cliet folder.

### Running the Application

#### Start the Server
- Navigate to the 'server' directory.
- Run the command to start the server (npm install).

#### Start the Client
- Navigate to the 'client' directory.
- Run the command to start the client application (npm install).


### Flowchart Description
1. **User submits the registration form.**
2. **Client-side validation:** Ensures all fields are filled correctly.
3. **Form data is sent to the server.**
4. **Server-side validation:** Validates and stores the data in the database.
5. **Server sends a confirmation email.**
6. **Confirmation page:** Displays the registration details and a unique registration ID.

## Live Demo
- **Frontend:** [Netlify Deployed Site](https://your-netlify-site-url)
- **Backend:** [Render Deployed API](https://your-render-api-url)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
