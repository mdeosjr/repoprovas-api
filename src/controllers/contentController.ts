import { Request, Response } from 'express';
import * as contentServices from '../services/contentServices.js';

export async function getContentByInstructors(req: Request, res: Response) {
	const content = await contentServices.instructorsContent();
	res.send(content).status(200);
}

export async function getContentByTerms(req: Request, res: Response) {
	const content = await contentServices.termsContent();
	res.send(content).status(200);
}
