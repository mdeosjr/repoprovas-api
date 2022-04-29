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

export async function termsContent() {
	const terms = await contentRepository.getDisciplinesByTerms();

	const array = [];

	for (const term of terms) {
		let tests = [];

		for (const discipline of term.disciplines) {
			tests.push({
				disciplineName: discipline.name,
				testsCategory: await contentRepository.getTestsByDiscipline(
					discipline.id
				),
			});
		}

		const result = {
			termId: term.id,
			termName: term.number,
			termTests: tests,
		};

		array.push(result);
	}

	return array;
}

export async function disciplinesContent() {
	return await contentRepository.getDisciplines();
}

export async function categoriesContent() {
	return await contentRepository.getCategoriesList();
}

export async function create(testData: CreateTest) {
	const { category, discipline, teacher, pdfUrl, name } = testData;

	const teacherId = await contentRepository.getTeachersByName(teacher);
	const disciplineId = await contentRepository.getDisciplinesByName(discipline);
	const categoryId = await contentRepository.getCategoriesByName(category);
	const teachersDisciplinesId = await contentRepository.getTeachersDisciplines(teacherId.id, disciplineId.id);

	const test: Omit<Tests, "id"> = {
		name,
		pdfUrl,
		categoryId: categoryId.id,
		teachersDisciplinesId: teachersDisciplinesId.id,
		disciplineId: disciplineId.id,
	};

	return await contentRepository.createTest(test)
}
