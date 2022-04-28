import { Request, Response } from 'express';
import * as contentServices from '../services/contentServices.js';

export async function getContentByTeachers(req: Request, res: Response) {
	const content = await contentServices.teachersContent();
	res.send(content).status(200);
}

export async function getContentByTerms(req: Request, res: Response) {
	const content = await contentServices.termsContent();
	res.send(content).status(200);
}
