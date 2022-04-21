import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { findSession } from '../repositories/authRepository.js';
import { findById } from '../repositories/userRepository.js';

interface Token {
    sessionId: number;
}

export async function validateToken(req: Request, res: Response, next: NextFunction) {
	const authorization = req.headers.authorization;
	const token = authorization?.replace('Bearer ', '');
    const secretKey = process.env.JWT_SECRET;
	if (!token) throw { type: 'not_found', message: 'Token not found' };

    const data: any = jwt.verify(token, secretKey);
    if (!data) throw { type: 'unauthorized', message: 'Invalid token' };

    const session = await findSession(data.sessionId);
	if (!session) throw { type: 'unauthorized', message: 'Session expired' };

    const user = await findById(session.userId);
    if (!user) throw { type: 'unauthorized', message: 'User not found'}

	res.locals.user = user;
	next();
}
