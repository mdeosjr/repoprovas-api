import { faker } from '@faker-js/faker';
import { UserData } from '../../src/controllers/userController.js';
import { prisma } from '../../src/db.js';
import bcrypt from 'bcrypt';

export function createUserBody(): UserData {
	return {
		email: faker.internet.email(),
		password: faker.internet.password(),
	};
}

export async function createUserDatabase(user: UserData) {
	await prisma.users.create({
		data: {
			...user,
			password: bcrypt.hashSync(user.password, 8),
		},
	});
}
