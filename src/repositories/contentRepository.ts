import { prisma } from '../db.js';

export async function getInstructor() {
	return await prisma.teachers.findMany({
		select: {
			id: true,
			name: true,
		},
	});
}

export async function getCategories(instructorId: number) {
	const tests = await prisma.categories.findMany({
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
	return tests;
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
					disciplineId
				},
				select: {
					id: true,
					name: true,
					pdfUrl: true,
					teachersDisciplines: {
						select: {
							teachers: {
								select: {
									name: true
								}
							}
						}
					}
				}
			},
		}
	})
}
