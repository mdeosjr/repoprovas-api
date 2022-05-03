import { Tests } from '@prisma/client';
import { CreateTest } from '../controllers/contentController.js';
import * as contentRepository from '../repositories/contentRepository.js';

export async function teachersContent() {
	const teachers = await contentRepository.getTeachers();

	const array = [];

	for (const teacher of teachers) {
		const categories = await contentRepository.getCategories(teacher.id);

		const result = {
			id: teacher.id,
			instructorName: teacher.name,
			disciplines: teacher.teachersDisciplines.map(
				(d) => d.disciplines.name
			),
			categories,
		};

		array.push(result);
	}

	return array;
}

export async function disciplinesList() {
	const disciplines = await contentRepository.getAllDisciplines();

	return disciplines;
}

export async function disciplinesContent(disciplineId: number) {
	const existentDiscipline = await contentRepository.getDisciplinesById(disciplineId);
	if (!existentDiscipline) throw { type: 'not_found', message: 'Discipline not found'}

	const discipline = contentRepository.getTestsByDiscipline(disciplineId);

	return discipline;
}

export async function termsContent() {
	const terms = await contentRepository.getDisciplinesByTerms();

	return terms;
}

export async function disciplinesByName(name: string) {
	const discipline = await contentRepository.getDisciplinesByName(name);
	if(!discipline) throw { type: 'not_found', message: 'Discipline not found' };

	return discipline;
}

export async function categories() {
	return await contentRepository.getCategoriesList();
}

export async function create(testData: CreateTest) {
	const { category, discipline, teacher, pdfUrl, name } = testData;

	const teacherId = await contentRepository.getTeachersByName(teacher);
	const disciplineId = await contentRepository.getDisciplinesByName(discipline);
	const categoryId = await contentRepository.getCategoriesByName(category);
	const teachersDisciplinesId = await contentRepository.getTeachersDisciplines(teacherId.id, disciplineId.id);

	const test: Omit<Tests, "id" | "viewsCount"> = {
		name,
		pdfUrl,
		categoryId: categoryId.id,
		teachersDisciplinesId: teachersDisciplinesId.id,
		disciplineId: disciplineId.id,
	};

	return await contentRepository.createTest(test)
}

export async function update(testId: number) {
	const test = await contentRepository.getTestsById(testId)
	if(!test) throw { type: 'not_found', message: 'Test not found' };
	
	return await contentRepository.updateViewsCount(testId)
}
