import * as contentRepository from '../repositories/contentRepository.js';

export async function teachersContent() {
	const teachers = await contentRepository.getTeachers();

	const array = [];

	for (const teacher of teachers) {
		const categories = await contentRepository.getCategories(teacher.id);
        
		const result = {
            id: teacher.id,
			instructorName: teacher.name,
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
			tests.push({disciplineName: discipline.name, testsCategory: await contentRepository.getTestsByDiscipline(discipline.id)})
		}

		const result = {
			termId: term.id,
			termName: term.number,
			termTests: tests,
		}

		array.push(result)
	}

	return array;
}