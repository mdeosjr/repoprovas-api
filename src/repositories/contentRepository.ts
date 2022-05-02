import { Tests } from '@prisma/client';
import { prisma } from '../db.js';

export async function getTeachers() {
	return await prisma.teachers.findMany({
		select: {
			id: true,
			name: true,
			teachersDisciplines: {
				select: {
					disciplines: true,
				},
			},
		},
	});
}

export async function getTeachersByName(name: string) {
	return await prisma.teachers.findUnique({
		where: { name },
	});
}

export async function getCategories(instructorId: number) {
	return await prisma.categories.findMany({
		select: {
			id: true,
			name: true,
			tests: {
				where: {
					teachersDisciplines: {
						teacherId: instructorId,
					},
				},
				select: {
					id: true,
					name: true,
					pdfUrl: true,
					viewsCount: true,
					teachersDisciplines: {
						select: {
							disciplines: {
								select: {
									name: true,
								},
							},
						},
					},
				},
			},
		},
	});
}

export async function getAllDisciplines() {
	return await prisma.disciplines.findMany({
		select: {
			name: true,
			id: true,
		},
	});
}

export async function getDisciplinesByTerms() {
	return await prisma.terms.findMany({
		select: {
			id: true,
			number: true,
			disciplines: {
				select: {
					id: true,
					name: true,
				},
			},
		},
	});
}

export async function getTestsByDiscipline(disciplineId: number) {
	return await prisma.categories.findMany({
		select: {
			name: true,
			tests: {
				where: {
					disciplineId,
				},
				select: {
					id: true,
					name: true,
					pdfUrl: true,
					viewsCount: true,
					teachersDisciplines: {
						select: {
							teachers: {
								select: {
									name: true,
								},
							},
						},
					},
				},
			},
		},
	});
}

export async function getCategoriesList() {
	return await prisma.categories.findMany({
		select: {
			id: true,
			name: true,
		},
	});
}

export async function getCategoriesByName(name: string) {
	return await prisma.categories.findUnique({
		where: { name },
	});
}

export async function getDisciplinesByName(name: string) {
	return await prisma.disciplines.findUnique({
		where: { name },
	});
}

export async function getTeachersDisciplines(
	teacherId: number,
	disciplineId: number
) {
	return await prisma.teachersDisciplines.findFirst({
		where: {
			AND: [{ disciplineId }, { teacherId }],
		},
	});
}

export async function createTest(test: Omit<Tests, 'id' | 'viewsCount'>) {
	return await prisma.tests.create({
		data: test,
	});
}

export async function updateViewsCount(testId: number) {
	return await prisma.tests.update({
		where: { id: testId },
		data: { viewsCount: { increment: 1 } },
	});
}
