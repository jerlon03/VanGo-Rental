// src/controllers/booking.controller.js
const Booking = require('../model/booking.model');
const transporter = require('../../config/mailer.config');

const sendConfirmationEmail = async (booking) => {

    try {
        await transporter.sendMail({
            from: `"VanGO Rental Services" <${process.env.SMTP_USER}>`,
            to: booking.email,
            subject: 'Booking Confirmation',
            html: `
               <div style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
            
                    <div style="background-color: #003459; color: #fff; padding: 15px; border-radius: 10px 10px 0 0; text-align: center;">
                        <h1 style="margin: 0; font-size: 24px;">Booking Confirmed!</h1>
                    </div>

                    <div style="padding: 20px;">
                        <p style="font-size: 16px; margin: 10px 0;">Dear ${booking.first_name} ${booking.last_name},</p>
                        <p style="font-size: 16px; margin: 10px 0;">Your booking has been confirmed. Below are your booking details:</p>

                        <ul style="list-style-type: none; padding: 0; font-size: 14px; margin: 10px 0;">
                            <li style="margin: 8px 0;"><strong>Booking ID:</strong> ${booking.booking_id}</li>
                            <li style="margin: 8px 0;"><strong>Start Date:</strong> ${booking.pickup_date_time}</li>
                            <li style="margin: 8px 0;"><strong>End Date:</strong> ${booking.end_date}</li>
                        </ul>

                        <p style="font-size: 16px; margin: 10px 0;">Thank you for choosing our service! We look forward to serving you.</p>
                    </div>

                    <div style="text-align: center; font-size: 12px; color: #777; margin-top: 20px;">
                        <p>If you have any questions, please <a href="mailto:jerlonabayon16@gmail.com" style="color: #007BFF; text-decoration: none;">contact us</a>.</p>
                        <p>&copy; ${new Date().getFullYear()} VanGO Rental Services. All rights reserved.</p>
                    </div>

                </div>
            `
        });
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

const sendDeclinedEmail = async (booking) => {
    try {
        await transporter.sendMail({
            from: `"VanGO Rental Services" <${process.env.SMTP_USER}>`,
            to: booking.email,
            subject: 'Booking Declined',
            html: `
               <div style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
            
                    <div style="background-color: #dc3545; color: #fff; padding: 15px; border-radius: 10px 10px 0 0; text-align: center;">
                        <h1 style="margin: 0; font-size: 24px;">Booking Update</h1>
                    </div>

                    <div style="padding: 20px;">
                        <p style="font-size: 16px; margin: 10px 0;">Dear ${booking.first_name} ${booking.last_name},</p>
                        <p style="font-size: 16px; margin: 10px 0;">We regret to inform you that your booking has been declined.</p>

                        <ul style="list-style-type: none; padding: 0; font-size: 14px; margin: 10px 0;">
                            <li style="margin: 8px 0;"><strong>Booking ID:</strong> ${booking.booking_id}</li>
                            <li style="margin: 8px 0;"><strong>Start Date:</strong> ${booking.pickup_date_time}</li>
                            <li style="margin: 8px 0;"><strong>End Date:</strong> ${booking.end_date}</li>
                        </ul>

                        <p style="font-size: 16px; margin: 10px 0;">If you have any questions, please don't hesitate to contact us.</p>
                    </div>

                    <div style="text-align: center; font-size: 12px; color: #777; margin-top: 20px;">
                        <p>For inquiries, please <a href="mailto:jerlonabayon16@gmail.com" style="color: #007BFF; text-decoration: none;">contact us</a>.</p>
                        <p>&copy; ${new Date().getFullYear()} VanGO Rental Services. All rights reserved.</p>
                    </div>

                </div>
            `
        });
    } catch (error) {
        console.error('Error sending declined email:', error);
        throw error;
    }
};

const sendCompletedEmail = async (booking) => {
    try {
        const feedbackLink = `${process.env.FRONTEND_URL}/feedback/${booking.booking_id}`;
        
        await transporter.sendMail({
            from: `"VanGO Rental Services" <${process.env.SMTP_USER}>`,
            to: booking.email,
            subject: 'Booking Completed - Share Your Experience',
            html: `
               <div style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
            
                    <div style="background-color: #28a745; color: #fff; padding: 15px; border-radius: 10px 10px 0 0; text-align: center;">
                        <h1 style="margin: 0; font-size: 24px;">Booking Completed!</h1>
                    </div>

                    <div style="padding: 20px;">
                        <p style="font-size: 16px; margin: 10px 0;">Dear ${booking.first_name} ${booking.last_name},</p>
                        <p style="font-size: 16px; margin: 10px 0;">Thank you for choosing VanGO Rental Services. Your booking has been completed.</p>

                        <ul style="list-style-type: none; padding: 0; font-size: 14px; margin: 10px 0;">
                            <li style="margin: 8px 0;"><strong>Booking ID:</strong> ${booking.booking_id}</li>
                            <li style="margin: 8px 0;"><strong>Start Date:</strong> ${booking.pickup_date_time}</li>
                            <li style="margin: 8px 0;"><strong>End Date:</strong> ${booking.end_date}</li>
                        </ul>

                        <div style="text-align: center; margin: 30px 0;">
                            <p style="font-size: 16px; margin: 10px 0;">We'd love to hear about your experience!</p>
                            <p style="font-size: 14px; color: #666; margin: 5px 0;">Note: The feedback form is only accessible for completed bookings.</p>
                            <a href="${feedbackLink}" 
                               style="display: inline-block; padding: 12px 24px; background-color: #007BFF; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold;">
                                Share Your Feedback
                            </a>
                        </div>

                        <p style="font-size: 16px; margin: 10px 0;">Your feedback helps us improve our services for future customers.</p>
                        <p style="font-size: 14px; color: #666; margin: 10px 0;"><i>Please note that the feedback link will only work for completed bookings.</i></p>
                    </div>

                    <div style="text-align: center; font-size: 12px; color: #777; margin-top: 20px;">
                        <p>If you have any questions, please <a href="mailto:jerlonabayon16@gmail.com" style="color: #007BFF; text-decoration: none;">contact us</a>.</p>
                        <p>&copy; ${new Date().getFullYear()} VanGO Rental Services. All rights reserved.</p>
                    </div>

                </div>
            `
        });
    } catch (error) {
        console.error('Error sending completed email:', error);
        throw error;
    }
};

exports.createBooking = async (req, res) => {


    // Check if the file is uploaded
    if (!req.file) {
        return res.status(400).json({ error: 'Proof of payment image is required.' });
    }

    // Get the URL of the uploaded image
    const imagePath = req.file.path; // Ensure this is the correct path

    // Set the proof_of_payment and ensure van_id and booking_end_date are included
    const bookingData = { 
        ...req.body, 
        proof_of_payment: imagePath 
    };

    // Ensure all required fields are included in bookingData
    const requiredFields = [
        'first_name', 
        'last_name', 
        'email', 
        'phone_number', 
        'date_of_birth', 
        'pickup_location', 
        'city_or_municipality', 
        'pickup_date_time', 
        'barangay', 
        'van_id',
        'booking_end_date' // Added booking_end_date to required fields
    ];
    for (const field of requiredFields) {
        if (!bookingData[field]) {
            return res.status(400).json({ error: `${field.replace('_', ' ')} is required.` });
        }
    }

    Booking.createBooking(bookingData, (err, bookingId) => {
        if (err) {
            console.error('Database Error:', err); // Log the error
            return res.status(400).json({ error: err.message });
        }
        res.status(201).json({ bookingId });
    });
};

exports.getAllBookings = (req, res) => {
    Booking.getAllBookings((err, bookings) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(bookings);
    });
};

exports.getBookingById = (req, res) => {
    const bookingId = req.params.id;

    Booking.getBookingById(bookingId, (err, booking) => {
        if (err) {
            if (err.message === 'Booking not found') {
                return res.status(404).json({ error: err.message });
            }
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(booking);
    });
}

exports.updateBookingStatus = (req, res) => {
    const bookingId = req.params.id;
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({ error: 'Status is required' });
    }

    Booking.updateBookingStatus(bookingId, status, async (err, result) => {
        if (err) {
            if (err.message === 'Booking not found') {
                return res.status(404).json({ error: err.message });
            }
            return res.status(500).json({ error: err.message });
        }

        try {
            Booking.getBookingById(bookingId, async (err, booking) => {
                if (err) {
                    console.error('Error fetching booking details:', err);
                } else {
                    const statusLower = status.toLowerCase();
                    if (statusLower === 'confirmed') {
                        await sendConfirmationEmail(booking);
                    } else if (statusLower === 'declined') {
                        await sendDeclinedEmail(booking);
                    } else if (statusLower === 'completed') {
                        await sendCompletedEmail(booking);
                    }
                }
            });
        } catch (error) {
            console.error('Error sending confirmation, declined, or completed email:', error);
        }

        res.status(200).json(result);
    });
};

exports.getBookingsByVanId = (req, res) => {
    const vanId = req.params.vanId;
    if (!vanId) {
        return res.status(400).json({ error: 'Van ID is required' });
    }

    Booking.getBookingsByVanId(vanId, (err, bookings) => {
        if (err) {
            console.error('Error fetching bookings by van ID:', err);
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(bookings);
    });
};

exports.getBookingStatusCounts = (req, res) => {
    Booking.getBookingStatusCounts((err, statusCounts) => {
        if (err) {
            console.error('Error fetching booking status counts:', err);
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(statusCounts); // Return the counts of each status
    });
};

exports.getBookingStatusCountsByVan = (req, res) => {
    const vanId = req.params.vanId; // Get the van ID from the request parameters
    if (!vanId) {
        return res.status(400).json({ error: 'Van ID is required' });
    }

    Booking.getBookingStatusCountsByVan(vanId, (err, statusCounts) => {
        if (err) {
            console.error('Error fetching booking status counts by van:', err);
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(statusCounts); // Return the counts of each status for the specified van
    });
};

