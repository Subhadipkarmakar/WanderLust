# Wanderlust - Travel Accommodation Booking Platform

A full-stack web application for booking travel accommodations, built with Node.js, Express, MongoDB, and EJS.

## Features

- **User Authentication**: Secure registration and login system
- **Property Listings**: Browse and search accommodations by category
- **Booking System**: Make reservations with date selection
- **Email Notifications**: Automated booking confirmation emails
- **Review System**: Rate and review properties
- **Responsive Design**: Mobile-friendly interface

## Email Setup Instructions

### For Gmail Users:

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to your Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Copy the 16-character password

3. **Update .env file**:
   ```env
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-16-character-app-password
   EMAIL_FROM=Wanderlust <your-email@gmail.com>
   ```

### For Other Email Providers:

**Outlook/Hotmail:**
```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USER=your-email@outlook.com
EMAIL_PASS=your-password
```

**Yahoo:**
```env
EMAIL_HOST=smtp.mail.yahoo.com
EMAIL_PORT=587
EMAIL_USER=your-email@yahoo.com
EMAIL_PASS=your-app-password
```

## Installation & Setup

1. **Clone the repository**
2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   - Copy `.env.example` to `.env`
   - Update MongoDB URI, email credentials, and other settings

4. **Run the application**:
   ```bash
   npm start
   # or for development
   npm run dev
   ```

## Testing Email Functionality

1. **Start the application**
2. **Login to your account**
3. **Test email connection**: Visit `/debug/email` (requires login)
4. **Make a booking** to receive an actual confirmation email

## Environment Variables

```env
# MongoDB
MONGO_URI=your_mongodb_connection_string

# Session Security
SECRET=your_session_secret_key
SESSION_CRYPTO_SECRET=your_session_crypto_secret

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=Wanderlust <your-email@gmail.com>

# Application Settings
PORT=8080
NODE_ENV=development
INIT_DB=false
```

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: Passport.js
- **Email**: Nodemailer
- **Template Engine**: EJS
- **Frontend**: Bootstrap, CSS, JavaScript

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Create a pull request

## License

This project is licensed under the MIT License.