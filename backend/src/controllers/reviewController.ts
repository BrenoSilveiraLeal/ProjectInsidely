import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import pool from '../config/database';

export const createReview = async (req: AuthRequest, res: Response) => {
  try {
    const explorerId = req.userId;
    const { bookingId, professionalId, honestyRating, helpfulnessRating, accuracyRating, comment } = req.body;

    // Check if booking is completed
    const booking = await pool.query(
      `SELECT * FROM bookings WHERE id = $1 AND explorer_id = $2 AND status = 'completed'`,
      [bookingId, explorerId]
    );

    if (booking.rows.length === 0) {
      return res.status(400).json({ error: 'Booking not found or not completed' });
    }

    // Check if review already exists
    const existingReview = await pool.query(
      `SELECT * FROM reviews WHERE booking_id = $1`,
      [bookingId]
    );

    if (existingReview.rows.length > 0) {
      return res.status(400).json({ error: 'Review already submitted' });
    }

    const overallRating = ((honestyRating + helpfulnessRating + accuracyRating) / 3).toFixed(2);

    const result = await pool.query(
      `INSERT INTO reviews (booking_id, explorer_id, professional_id, honesty_rating, 
                           helpfulness_rating, accuracy_rating, overall_rating, comment)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [bookingId, explorerId, professionalId, honestyRating, helpfulnessRating, 
       accuracyRating, overallRating, comment]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({ error: 'Failed to create review' });
  }
};

export const getReviews = async (req: AuthRequest, res: Response) => {
  try {
    const { professionalId } = req.params;

    const result = await pool.query(
      `SELECT r.*, u.full_name as explorer_name, u.profile_picture as explorer_picture
       FROM reviews r
       JOIN users u ON r.explorer_id = u.id
       WHERE r.professional_id = $1
       ORDER BY r.created_at DESC`,
      [professionalId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};
