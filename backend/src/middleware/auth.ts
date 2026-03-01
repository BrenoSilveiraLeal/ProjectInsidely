import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  userId?: number;
  userType?: string;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    req.userId = decoded.userId;
    req.userType = decoded.userType;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

export const isProfessional = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.userType !== 'professional') {
    return res.status(403).json({ error: 'Professional access required' });
  }
  next();
};

export const isExplorer = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.userType !== 'explorer') {
    return res.status(403).json({ error: 'Explorer access required' });
  }
  next();
};
