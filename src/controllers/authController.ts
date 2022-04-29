import { Request, Response } from "express";
import { UserData } from "./userController.js";
import * as authServices from '../services/authServices.js';

export async function login(req: Request, res: Response) {
    const loginUser: UserData = req.body;

    const data = await authServices.login(loginUser);
    res.status(200).send(data);
}