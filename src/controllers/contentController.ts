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

export async function getDisciplinesList(req: Request, res: Response) {
	const content = await contentServices.disciplinesList();
	res.status(200).send(content);
}

export async function getContentByDisciplines(req: Request, res: Response) {
	const { id } = req.params;
	const content = await contentServices.disciplinesContent(parseInt(id));

	res.status(200).send(content);
}

export async function getDisciplinesByName(req: Request, res: Response) {
	const { name } = req.params;
	if (!name) throw { type: 'bad_request' , message: 'Discipline does not exist' };
	
	const content = await contentServices.disciplinesByName(name);
	res.status(200).send(content);
}

export async function getCategoriesList(req: Request, res: Response) {
	const content = await contentServices.categories();
	res.status(200).send(content);
}

export async function createTest(req: Request, res: Response) {
	const body: CreateTest = req.body;

	await contentServices.create(body);
	res.sendStatus(201);
}

export async function updateTestViews(req: Request, res: Response) {
	const { id } = req.params;
	
	await contentServices.update(parseInt(id));
	res.sendStatus(200);
}
