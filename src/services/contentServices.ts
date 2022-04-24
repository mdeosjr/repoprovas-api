import * as contentRepository from '../repositories/contentRepository.js';

export async function content() {
	const teachers = await contentRepository.getInstructor();

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
