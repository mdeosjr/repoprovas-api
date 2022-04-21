import { Request, Response } from "express";
import { UserData } from "./userController.js";
import * as authServices from '../services/authServices.js';

export async function login(req: Request, res: Response) {
    const loginUser: UserData = req.body;

    const token = await authServices.login(loginUser);
    res.send(token).status(200);
}