import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authToken = async (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  const token = header && header.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  const secret = process.env.ACCESS_TOKEN_SECRET || 'secret';

  try {
    const user = await jwt.verify(token, secret);
    Object.assign(req, user);
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(403);
  }
};
