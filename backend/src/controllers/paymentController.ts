import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import Stripe from 'stripe';
import pool from '../config/database';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

export const createPaymentIntent = async (req: AuthRequest, res: Response) => {
  try {
    const explorerId = req.userId;
    const { bookingId, amount } = req.body;

    // Get booking details
    const booking = await pool.query(
      `SELECT b.*, pp.id as professional_profile_id 
       FROM bookings b 
       JOIN professional_profiles pp ON b.professional_id = pp.id
       WHERE b.id = $1`,
      [bookingId]
    );

    if (booking.rows.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        bookingId: bookingId.toString(),
        explorerId: explorerId!.toString(),
        professionalId: booking.rows[0].professional_profile_id.toString(),
      },
    });

    // Save payment record
    await pool.query(
      `INSERT INTO payments (booking_id, explorer_id, professional_id, amount, stripe_payment_intent, status)
       VALUES ($1, $2, $3, $4, $5, 'pending')`,
      [bookingId, explorerId, booking.rows[0].professional_profile_id, amount, paymentIntent.id]
    );

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Payment intent error:', error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
};

export const handleWebhook = async (req: AuthRequest, res: Response) => {
  try {
    const sig = req.headers['stripe-signature']!;
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      
      // Update payment status
      await pool.query(
        `UPDATE payments SET status = 'completed', stripe_payment_id = $1 
         WHERE stripe_payment_intent = $2`,
        [paymentIntent.id, paymentIntent.id]
      );

      // Update booking status
      const bookingId = paymentIntent.metadata.bookingId;
      await pool.query(
        `UPDATE bookings SET status = 'confirmed' WHERE id = $1`,
        [bookingId]
      );
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).json({ error: 'Webhook failed' });
  }
};

export const getPaymentHistory = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const userType = req.userType;

    const query = userType === 'professional'
      ? `SELECT p.*, b.booking_date, u.full_name as explorer_name
         FROM payments p
         JOIN bookings b ON p.booking_id = b.id
         JOIN users u ON p.explorer_id = u.id
         JOIN professional_profiles pp ON p.professional_id = pp.id
         WHERE pp.user_id = $1 AND p.status = 'completed'
         ORDER BY p.created_at DESC`
      : `SELECT p.*, b.booking_date, pp.job_title, u.full_name as professional_name
         FROM payments p
         JOIN bookings b ON p.booking_id = b.id
         JOIN professional_profiles pp ON p.professional_id = pp.id
         JOIN users u ON pp.user_id = u.id
         WHERE p.explorer_id = $1
         ORDER BY p.created_at DESC`;

    const result = await pool.query(query, [userId]);
    res.json(result.rows);
  } catch (error) {
    console.error('Get payment history error:', error);
    res.status(500).json({ error: 'Failed to fetch payment history' });
  }
};
