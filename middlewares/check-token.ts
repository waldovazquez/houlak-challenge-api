import {
  NextFunction,
  Request,
  Response,
} from 'express';

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('x-access-token');

  if (!token) {
    return res.status(401).json({
      msg: 'You are not authorized to do this',
    });
  }

  return next();
};