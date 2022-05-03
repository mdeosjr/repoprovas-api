import { createUserBody, createUserDatabase } from './userFactory.js';
import supertest from 'supertest';
import server from '../../src/index.js';

export async function login() {
	const body = createUserBody();
	await createUserDatabase(body);

	const res = await supertest(server).post('/login').send(body);

    const token = res.text
    return token;
}
