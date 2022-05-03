import supertest from 'supertest';
import server from '../src/index.js';
import startTest from './startTest.js';
import { prisma } from '../src/db.js';
import { createUserBody, createUserDatabase } from './factories/userFactory.js';
import { login } from './factories/tokenFactory.js';
import {
	createTestBody,
	createTestDatabase,
} from './factories/testsFactory.js';

const agent = supertest(server);

describe('POST /users/create', () => {
	startTest();

	it('should return 201 and persist user in database given a valid body', async () => {
		const body = createUserBody();

		const res = await agent.post('/users/create').send(body);
		const user = await prisma.users.findUnique({
			where: {
				email: body.email,
			},
		});

		expect(res.status).toEqual(201);
		expect(user).not.toBeNull();
	});

	it('should return 422 given a invalid body', async () => {
		const body = {};

		const res = await agent.post('/users/create').send(body);

		expect(res.status).toEqual(422);
	});

	it('should return 409 given a registered email address', async () => {
		const body = createUserBody();

		await agent.post('/users/create').send(body);
		const res = await agent.post('/users/create').send(body);
		const users = await prisma.users.findMany({
			where: {
				email: body.email,
			},
		});

		expect(res.status).toEqual(409);
		expect(users.length).toEqual(1);
	});
});

describe('POST /login', () => {
	startTest();

	it('should return 200 and a token given a valid body', async () => {
		const body = createUserBody();
		await createUserDatabase(body);

		const res = await agent.post('/login').send(body);

		expect(res.status).toEqual(200);
		expect(typeof res.text).toEqual('string');
	});

	it('should return 401 given invalid credentials', async () => {
		const body = createUserBody();

		const res = await agent.post('/login').send(body);

		expect(res.status).toEqual(401);
	});
});

describe('GET /content/teachers', () => {
	startTest();

	it('should return 200 and a array with content given a valid token', async () => {
		const token = await login();

		const res = await agent
			.get('/content/teachers')
			.set('Authorization', `Bearer ${token}`);

		expect(res.status).toEqual(200);
		expect(res.body).not.toBe(null);
	});

	it('should return 500 given a invalid token', async () => {
		const res = await agent
			.get('/content/teachers')
			.set('Authorization', `Bearer 123456`);

		expect(res.status).toEqual(500);
	});
});

describe('GET /content/terms', () => {
	startTest();

	it('should return 200 and a array with content given a valid token', async () => {
		const token = await login();

		const res = await agent
			.get('/content/terms')
			.set('Authorization', `Bearer ${token}`);

		expect(res.status).toEqual(200);
		expect(res.body).not.toBe(null);
	});

	it('should return 500 given a invalid token', async () => {
		const res = await agent
			.get('/content/terms')
			.set('Authorization', `Bearer 123456`);

		expect(res.status).toEqual(500);
	});
});

describe('GET /content/disciplines', () => {
	startTest();

	it('should return 200 and a array with content given a valid token', async () => {
		const token = await login();

		const res = await agent
			.get('/content/disciplines')
			.set('Authorization', `Bearer ${token}`);

		expect(res.status).toEqual(200);
		expect(res.body).not.toBe(null);
	});

	it('should return 500 given a invalid token', async () => {
		const res = await agent
			.get('/content/disciplines')
			.set('Authorization', `Bearer 123456`);

		expect(res.status).toEqual(500);
	});
});

describe('GET /content/discipline/:name', () => {
	startTest();

	it('should return 200 and a array with content given a valid params and token', async () => {
		const token = await login();
		const { name } = await prisma.disciplines.findFirst();

		const res = await agent
			.get(`/content/discipline/${name}`)
			.set('Authorization', `Bearer ${token}`);

		expect(res.status).toEqual(200);
		expect(res.body).not.toBe(null);
		expect(res.body.name).toEqual(name);
	});

	it('should return 404 given invalid params', async () => {
		const token = await login();
		const name = '';

		const res = await agent
			.get(`/content/discipline/${name}`)
			.set('Authorization', `Bearer ${token}`);

		expect(res.status).toEqual(404);
	});
});

describe('GET /content/discipline/:id', () => {
	startTest();

	it('should return 200 and a array with content given a valid params and token', async () => {
		const token = await login();
		const { id } = await prisma.disciplines.findFirst();

		const res = await agent
			.get(`/content/disciplines/${id}`)
			.set('Authorization', `Bearer ${token}`);

		expect(res.status).toEqual(200);
		expect(res.body).not.toBe(null);
	});

	it('should return 404 given invalid params', async () => {
		const token = await login();
		const id = -1;

		const res = await agent
			.get(`/content/disciplines/${id}`)
			.set('Authorization', `Bearer ${token}`);

		expect(res.status).toEqual(404);
	});
});

describe('GET /content/categories', () => {
	startTest();

	it('should return 200 and a array with content given a valid token', async () => {
		const token = await login();

		const res = await agent
			.get('/content/disciplines')
			.set('Authorization', `Bearer ${token}`);

		expect(res.status).toEqual(200);
		expect(res.body).not.toBe(null);
	});

	it('should return 500 given a invalid token', async () => {
		const res = await agent
			.get('/content/teachers')
			.set('Authorization', `Bearer 123456`);

		expect(res.status).toEqual(500);
	});
});

describe('POST /tests/create', () => {
	startTest();

	it('should return 201 and persist test in database given valid body', async() => {
		const token = await login();
		const body = createTestBody();

		const res = await agent
			.post('/tests/create')
			.send(body)
			.set('Authorization', `Bearer ${token}`);
		const test = await prisma.tests.findFirst({
			where: { name: body.name }
		})

		expect(res.status).toEqual(201);
		expect(test).not.toBeNull();
	});

	it('should return 422 given a invalid body', async () => {
		const token = await login();
		const body = {};

		const res = await agent
			.post('/tests/create')
			.send(body)
			.set('Authorization', `Bearer ${token}`);

		expect(res.status).toEqual(422);
	});

	it('should return 500 given a invalid token', async () => {
		const res = await agent
			.post('/tests/create')
			.set('Authorization', `Bearer 123456`);

		expect(res.status).toEqual(500);
	});
});

describe('PATCH /test/:id', () => {
	startTest();

	it('should return 200 given a valid token and valid params', async () => {
		const token = await login();
		const testBody = createTestBody();
		await createTestDatabase(testBody);
		const { id } = await prisma.tests.findFirst();

		const res = await agent
			.patch(`/test/${id}`)
			.set('Authorization', `Bearer ${token}`);

		expect(res.status).toEqual(200);
		expect(res.body).not.toBe(null);

		await prisma.$executeRaw`TRUNCATE TABLE tests;`;
	});

	it('should return 404 given invalid params', async () => {
		const token = await login();
		const id = -1;

		const res = await agent
			.patch(`/test/${id}`)
			.set('Authorization', `Bearer ${token}`);

		expect(res.status).toEqual(404);
	});
});
