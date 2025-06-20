// utils/emailService.js
const nodemailer = require('nodemailer');

// Create transporter for sending emails
const createTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: process.env.EMAIL_PORT || 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
};

// Send booking confirmation email
const sendBookingConfirmation = async (userEmail, userName, bookingDetails) => {
    try {
        const transporter = createTransporter();
        
        // Calculate number of nights
        const checkIn = new Date(bookingDetails.checkIn);
        const checkOut = new Date(bookingDetails.checkOut);
        const nights = Math.floor((checkOut - checkIn) / (1000 * 60 * 60 * 24));
        
        // Format dates
        const formatDate = (date) => {
            return new Date(date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        };
        
        const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Booking Confirmation - Wanderlust</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }
                .header {
                    background: linear-gradient(135deg, #fe424d, #ff6b73);
                    color: white;
                    padding: 30px;
                    text-align: center;
                    border-radius: 10px 10px 0 0;
                }
                .header h1 {
                    margin: 0;
                    font-size: 28px;
                }
                .header p {
                    margin: 10px 0 0 0;
                    opacity: 0.9;
                }
                .content {
                    background: #f9f9f9;
                    padding: 30px;
                    border-radius: 0 0 10px 10px;
                }
                .booking-details {
                    background: white;
                    padding: 25px;
                    border-radius: 8px;
                    margin: 20px 0;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                .detail-row {
                    display: flex;
                    justify-content: space-between;
                    padding: 8px 0;
                    border-bottom: 1px solid #eee;
                }
                .detail-row:last-child {
                    border-bottom: none;
                    font-weight: bold;
                    font-size: 16px;
                    color: #fe424d;
                }
                .detail-label {
                    font-weight: bold;
                    color: #666;
                }
                .highlight {
                    background: #e8f5e8;
                    padding: 15px;
                    border-radius: 5px;
                    margin: 15px 0;
                    border-left: 4px solid #4caf50;
                }
                .footer {
                    text-align: center;
                    margin-top: 30px;
                    color: #666;
                    font-size: 14px;
                }
                .button {
                    display: inline-block;
                    background: #fe424d;
                    color: white;
                    padding: 12px 25px;
                    text-decoration: none;
                    border-radius: 5px;
                    margin: 15px 0;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>🏨 Wanderlust</h1>
                <p>Your journey begins here</p>
            </div>
            
            <div class="content">
                <h2>Hello ${userName}! 👋</h2>
                
                <div class="highlight">
                    ✅ <strong>Booking Confirmed!</strong> Your reservation has been successfully confirmed.
                </div>
                
                <p>We're excited to confirm your booking! Here are your reservation details:</p>
                
                <div class="booking-details">
                    <h3>📋 Booking Details</h3>
                    
                    <div class="detail-row">
                        <span class="detail-label">🏠 Property:</span>
                        <span>${bookingDetails.listing.title}</span>
                    </div>
                    
                    <div class="detail-row">
                        <span class="detail-label">📍 Location:</span>
                        <span>${bookingDetails.listing.location}, ${bookingDetails.listing.country}</span>
                    </div>
                    
                    <div class="detail-row">
                        <span class="detail-label">📅 Check-in:</span>
                        <span>${formatDate(bookingDetails.checkIn)}</span>
                    </div>
                    
                    <div class="detail-row">
                        <span class="detail-label">📅 Check-out:</span>
                        <span>${formatDate(bookingDetails.checkOut)}</span>
                    </div>
                    
                    <div class="detail-row">
                        <span class="detail-label">🌙 Nights:</span>
                        <span>${nights} night${nights > 1 ? 's' : ''}</span>
                    </div>
                    
                    <div class="detail-row">
                        <span class="detail-label">👥 Guests:</span>
                        <span>${bookingDetails.guests} guest${bookingDetails.guests > 1 ? 's' : ''}</span>
                    </div>
                    
                    <div class="detail-row">
                        <span class="detail-label">💰 Total Amount:</span>
                        <span>₹${bookingDetails.totalPrice}</span>
                    </div>
                </div>
                
                <p><strong>What's next?</strong></p>
                <ul>
                    <li>Save this email for your records</li>
                    <li>You'll receive check-in instructions 24 hours before your arrival</li>
                    <li>Contact your host if you have any questions</li>
                </ul>
                
                <p>If you need to make any changes to your booking or have questions, please don't hesitate to contact us.</p>
                
                <p>Thank you for choosing Wanderlust! We hope you have an amazing stay! 🌟</p>
            </div>
            
            <div class="footer">
                <p>This is an automated email from Wanderlust. Please do not reply to this email.</p>
                <p>© ${new Date().getFullYear()} Wanderlust. All rights reserved.</p>
            </div>
        </body>
        </html>
        `;
        
        const textContent = `
Hello ${userName}!

🎉 BOOKING CONFIRMED! 🎉

Your reservation has been successfully confirmed. Here are your booking details:

Property: ${bookingDetails.listing.title}
Location: ${bookingDetails.listing.location}, ${bookingDetails.listing.country}
Check-in: ${formatDate(bookingDetails.checkIn)}
Check-out: ${formatDate(bookingDetails.checkOut)}
Nights: ${nights} night${nights > 1 ? 's' : ''}
Guests: ${bookingDetails.guests} guest${bookingDetails.guests > 1 ? 's' : ''}
Total Amount: ₹${bookingDetails.totalPrice}

What's next?
- Save this email for your records
- You'll receive check-in instructions 24 hours before your arrival
- Contact your host if you have any questions

Thank you for choosing Wanderlust! We hope you have an amazing stay!

Best regards,
The Wanderlust Team

This is an automated email. Please do not reply.
        `;
        
        const mailOptions = {
            from: process.env.EMAIL_FROM || '"Wanderlust" <noreply@wanderlust.com>',
            to: userEmail,
            subject: `🏨 Booking Confirmed - ${bookingDetails.listing.title} | Wanderlust`,
            text: textContent,
            html: htmlContent
        };
        
        const info = await transporter.sendMail(mailOptions);
        console.log('Booking confirmation email sent successfully:', info.messageId);
        return { success: true, messageId: info.messageId };
        
    } catch (error) {
        console.error('Error sending booking confirmation email:', error);
        return { success: false, error: error.message };
    }
};

// Test email connection
const testEmailConnection = async () => {
    try {
        const transporter = createTransporter();
        await transporter.verify();
        console.log('Email server connection verified successfully');
        return true;
    } catch (error) {
        console.error('Email server connection failed:', error);
        return false;
    }
};

module.exports = {
    sendBookingConfirmation,
    testEmailConnection
};