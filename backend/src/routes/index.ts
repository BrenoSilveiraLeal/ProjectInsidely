import express from 'express';
import * as authController from '../controllers/authController';
import * as profileController from '../controllers/profileController';
import * as bookingController from '../controllers/bookingController';
import * as paymentController from '../controllers/paymentController';
import * as reviewController from '../controllers/reviewController';
import { authenticate, isProfessional } from '../middleware/auth';

const router = express.Router();

// Auth routes
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.get('/auth/profile', authenticate, authController.getProfile);

// Profile routes
router.post('/profiles', authenticate, isProfessional, profileController.createProfile);
router.get('/profiles/search', profileController.searchProfiles);
router.get('/profiles/:id', profileController.getProfile);
router.put('/profiles', authenticate, isProfessional, profileController.updateProfile);

// Booking routes
router.post('/bookings', authenticate, bookingController.createBooking);
router.get('/bookings', authenticate, bookingController.getBookings);
router.put('/bookings/:id', authenticate, bookingController.updateBookingStatus);

// Payment routes
router.post('/payments/intent', authenticate, paymentController.createPaymentIntent);
router.post('/payments/webhook', paymentController.handleWebhook);
router.get('/payments/history', authenticate, paymentController.getPaymentHistory);

// Review routes
router.post('/reviews', authenticate, reviewController.createReview);
router.get('/reviews/:professionalId', reviewController.getReviews);

export default router;
