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