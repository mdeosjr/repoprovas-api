import { Request, Response } from 'express';
import { Users } from '@prisma/client';
import * as userServices from '../services/userServices.js';

export type UserData = Omit<Users, "id">
export async function createUser(req: Request, res: Response) {
    const user: UserData = req.body;

    await userServices.create(user);
    res.sendStatus(201);
}