import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import pool from '../config/database';

export const createProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const {
      companyId, professionId, jobTitle, yearsExperience, salaryRangeMin, salaryRangeMax,
      jobDescription, workEnvironment, managerRelationship, dailyTasks, workLifeBalance,
      pros, cons, pricePerCall, communicationTypes
    } = req.body;

    const result = await pool.query(
      `INSERT INTO professional_profiles 
       (user_id, company_id, profession_id, job_title, years_experience, salary_range_min, 
        salary_range_max, job_description, work_environment, manager_relationship, daily_tasks, 
        work_life_balance, pros, cons, price_per_call, communication_types)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
       RETURNING *`,
      [userId, companyId, professionId, jobTitle, yearsExperience, salaryRangeMin, salaryRangeMax,
       jobDescription, workEnvironment, managerRelationship, dailyTasks, workLifeBalance,
       pros, cons, pricePerCall, communicationTypes]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Create profile error:', error);
    res.status(500).json({ error: 'Failed to create profile' });
  }
};

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT pp.*, u.full_name, u.profile_picture, u.region, c.name as company_name, 
              c.logo_url as company_logo, p.title as profession_title
       FROM professional_profiles pp
       JOIN users u ON pp.user_id = u.id
       LEFT JOIN companies c ON pp.company_id = c.id
       LEFT JOIN professions p ON pp.profession_id = p.id
       WHERE pp.id = $1 AND pp.is_active = true`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

export const searchProfiles = async (req: AuthRequest, res: Response) => {
  try {
    const { 
      search, companyId, professionId, minSalary, maxSalary, 
      minExperience, maxExperience, minPrice, maxPrice, minRating,
      lat, lng, radius, page = 1, limit = 20 
    } = req.query;

    let query = `
      SELECT pp.*, u.full_name, u.profile_picture, u.region, 
             c.name as company_name, c.logo_url as company_logo, 
             p.title as profession_title
      FROM professional_profiles pp
      JOIN users u ON pp.user_id = u.id
      LEFT JOIN companies c ON pp.company_id = c.id
      LEFT JOIN professions p ON pp.profession_id = p.id
      WHERE pp.is_active = true
    `;

    const params: any[] = [];
    let paramCount = 1;

    if (search) {
      query += ` AND (pp.job_title ILIKE $${paramCount} OR c.name ILIKE $${paramCount} OR p.title ILIKE $${paramCount})`;
      params.push(`%${search}%`);
      paramCount++;
    }

    if (companyId) {
      query += ` AND pp.company_id = $${paramCount}`;
      params.push(companyId);
      paramCount++;
    }

    if (professionId) {
      query += ` AND pp.profession_id = $${paramCount}`;
      params.push(professionId);
      paramCount++;
    }

    if (minSalary) {
      query += ` AND pp.salary_range_min >= $${paramCount}`;
      params.push(minSalary);
      paramCount++;
    }

    if (maxSalary) {
      query += ` AND pp.salary_range_max <= $${paramCount}`;
      params.push(maxSalary);
      paramCount++;
    }

    if (minExperience) {
      query += ` AND pp.years_experience >= $${paramCount}`;
      params.push(minExperience);
      paramCount++;
    }

    if (maxExperience) {
      query += ` AND pp.years_experience <= $${paramCount}`;
      params.push(maxExperience);
      paramCount++;
    }

    if (minPrice) {
      query += ` AND pp.price_per_call >= $${paramCount}`;
      params.push(minPrice);
      paramCount++;
    }

    if (maxPrice) {
      query += ` AND pp.price_per_call <= $${paramCount}`;
      params.push(maxPrice);
      paramCount++;
    }

    if (minRating) {
      query += ` AND pp.average_rating >= $${paramCount}`;
      params.push(minRating);
      paramCount++;
    }

    query += ` ORDER BY pp.average_rating DESC, pp.total_reviews DESC`;
    query += ` LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
    params.push(limit, (Number(page) - 1) * Number(limit));

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Search profiles error:', error);
    res.status(500).json({ error: 'Search failed' });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const updates = req.body;

    const fields = Object.keys(updates).map((key, idx) => `${key} = $${idx + 2}`).join(', ');
    const values = Object.values(updates);

    const result = await pool.query(
      `UPDATE professional_profiles SET ${fields} WHERE user_id = $1 RETURNING *`,
      [userId, ...values]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};
