import { Request, Response } from 'express';
import * as contentServices from '../services/contentServices.js';

export async function getContent(req: Request, res: Response) {
	const content = await contentServices.content();
	res.send(content).status(201);
}
