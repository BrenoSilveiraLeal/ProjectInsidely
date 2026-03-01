import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import pool from '../config/database';

export const createBooking = async (req: AuthRequest, res: Response) => {
  try {
    const explorerId = req.userId;
    const { professionalId, bookingDate, startTime, endTime, communicationType, notes } = req.body;

    // Check availability
    const availability = await pool.query(
      `SELECT * FROM bookings 
       WHERE professional_id = $1 AND booking_date = $2 
       AND status != 'cancelled'
       AND (
         (start_time <= $3 AND end_time > $3) OR
         (start_time < $4 AND end_time >= $4) OR
         (start_time >= $3 AND end_time <= $4)
       )`,
      [professionalId, bookingDate, startTime, endTime]
    );

    if (availability.rows.length > 0) {
      return res.status(400).json({ error: 'Time slot not available' });
    }

    const result = await pool.query(
      `INSERT INTO bookings (explorer_id, professional_id, booking_date, start_time, end_time, communication_type, notes, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'pending') RETURNING *`,
      [explorerId, professionalId, bookingDate, startTime, endTime, communicationType, notes]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
};

export const getBookings = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const userType = req.userType;

    const query = userType === 'professional'
      ? `SELECT b.*, u.full_name as explorer_name, u.profile_picture as explorer_picture
         FROM bookings b
         JOIN professional_profiles pp ON b.professional_id = pp.id
         JOIN users u ON b.explorer_id = u.id
         WHERE pp.user_id = $1
         ORDER BY b.booking_date DESC, b.start_time DESC`
      : `SELECT b.*, pp.job_title, u.full_name as professional_name, u.profile_picture as professional_picture,
                c.name as company_name
         FROM bookings b
         JOIN professional_profiles pp ON b.professional_id = pp.id
         JOIN users u ON pp.user_id = u.id
         LEFT JOIN companies c ON pp.company_id = c.id
         WHERE b.explorer_id = $1
         ORDER BY b.booking_date DESC, b.start_time DESC`;

    const result = await pool.query(query, [userId]);
    res.json(result.rows);
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

export const updateBookingStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status, meetingLink } = req.body;

    const result = await pool.query(
      `UPDATE bookings SET status = $1, meeting_link = $2 WHERE id = $3 RETURNING *`,
      [status, meetingLink, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update booking error:', error);
    res.status(500).json({ error: 'Failed to update booking' });
  }
};
