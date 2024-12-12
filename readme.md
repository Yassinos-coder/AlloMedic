# Allo Medic

Allo Medic is a mobile app that connects users needing medical assistance at home with medics, similar to Uber's business model. The app takes a commission from the medics for each completed task.

## Backend Dependencies

- **Express**: Web framework for Node.js
- **Socket.IO**: Real-time communication
- **Axios**: HTTP requests
- **bcrypt**: Password hashing
- **jsonwebtoken**: JWT for authentication
- **mongoose**: MongoDB ORM
- **twilio**: SMS service for notifications
- **nodemailer**: Email service for notifications
- **pm2**: Process manager for production

## Expo (Frontend) Dependencies

- **React Navigation**: Navigation for the app
- **Redux Toolkit**: State management
- **Axios**: HTTP requests
- **socket.io-client**: Real-time communication
- **expo-location**: Location services
- **expo-notifications**: Push notifications
- **expo-secure-store**: Secure storage

## Third-party Services

- **Twilio**: SMS notifications for users and medics
- **SendGrid**: Email notifications (for user verification)
- **OpenCageData**: Geolocation and reverse geocoding services
- **IPify**: IP geolocation services

## Setup

1. Install backend dependencies: `npm install`
2. Install frontend dependencies: `npm install` in the `app` directory
3. Run the backend: `npm start`
4. Run the frontend: `expo start`

## License

MIT License
