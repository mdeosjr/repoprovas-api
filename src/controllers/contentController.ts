import { Request, Response } from 'express';
import * as contentServices from '../services/contentServices.js';

export interface CreateTest {
	name: string;
	pdfUrl: string;
	category: string;
	discipline: string;
	teacher: string;
}

export async function getContentByTeachers(req: Request, res: Response) {
	const content = await contentServices.teachersContent();
	res.status(200).send(content);
}

export async function getContentByTerms(req: Request, res: Response) {
	const content = await contentServices.termsContent();
	res.status(200).send(content);
}

export async function getContentByDisciplines(req: Request, res: Response) {
	const content = await contentServices.disciplinesContent();
	res.status(200).send(content);
}

export async function getCategoriesList(req: Request, res: Response) {
	const content = await contentServices.categoriesContent();
	res.status(200).send(content);
}

export async function createTest(req: Request, res: Response) {
	const body: CreateTest = req.body;

	await contentServices.create(body);
	res.sendStatus(201);
}