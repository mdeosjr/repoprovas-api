import { faker } from '@faker-js/faker';
import { CreateTest } from '../../src/controllers/contentController.js';
import * as contentRepository from '../../src/repositories/contentRepository.js';
import { prisma } from '../../src/db.js';
import { Tests } from '@prisma/client';

export function createTestBody(): CreateTest {
	return {
		name: faker.lorem.words(2),
		pdfUrl: faker.internet.url(),
		category: 'P1',
		discipline: 'Cálculo 1',
		teacher: 'Moises',
	};
}

export async function createTestDatabase(testData: CreateTest) {
	const { category, discipline, teacher, pdfUrl, name } = testData;

	const teacherId = await contentRepository.getTeachersByName(teacher);
	const disciplineId = await contentRepository.getDisciplinesByName(
		discipline
	);
	const categoryId = await contentRepository.getCategoriesByName(category);
	const teachersDisciplinesId = await contentRepository.getTeachersDisciplines(
		teacherId.id,
		disciplineId.id
	);

	const test: Omit<Tests, 'id' | 'viewsCount'> = {
		name,
		pdfUrl,
		categoryId: categoryId.id,
		teachersDisciplinesId: teachersDisciplinesId.id,
		disciplineId: disciplineId.id,
	};

	return await prisma.tests.create({
        data: test
    });
}
