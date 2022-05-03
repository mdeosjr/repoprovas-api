import { prisma } from '../src/db.js';

async function main() {
	await prisma.users.create({
		data: {
			email: 'jr@jr.com',
			password: '1234',
		},
	});

	await prisma.categories.createMany({
		data: [
			{ name: 'P1' },
			{ name: 'P2' },
			{ name: 'PF' },
			{ name: 'P2Ch' },
		],
	});

	await prisma.terms.createMany({
		data: [
			{ number: 1 },
			{ number: 2 },
			{ number: 3 },
			{ number: 4 },
			{ number: 5 },
			{ number: 6 },
			{ number: 7 },
			{ number: 8 },
		],
	});

	await prisma.disciplines.createMany({
		data: [
			{ name: 'Cálculo 1', termId: 1 },
			{ name: 'Cálculo 2', termId: 2 },
			{ name: 'Cálculo 3', termId: 3 },
			{ name: 'Cálculo 4', termId: 4 },
			{ name: 'Física 1', termId: 1 },
			{ name: 'Fenômenos de Transporte', termId: 5 },
			{ name: 'Termodinâmica', termId: 6 },
			{ name: 'Física 2', termId: 2 },
		],
	});

	await prisma.teachers.createMany({
		data: [
			{ name: 'Pedro' },
			{ name: 'Maria' },
			{ name: 'José' },
			{ name: 'Ana' },
			{ name: 'Gabrielle' },
			{ name: 'Valéria' },
			{ name: 'Junior' },
			{ name: 'Moises' },
		],
	});

	await prisma.teachersDisciplines.createMany({
		data: [
			{ teacherId: 1, disciplineId: 1 },
			{ teacherId: 2, disciplineId: 2 },
			{ teacherId: 3, disciplineId: 3 },
			{ teacherId: 4, disciplineId: 4 },
			{ teacherId: 5, disciplineId: 5 },
			{ teacherId: 6, disciplineId: 6 },
			{ teacherId: 7, disciplineId: 7 },
			{ teacherId: 8, disciplineId: 1 },
		],
	});
}

main()
	.catch((e) => {
		console.log(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
