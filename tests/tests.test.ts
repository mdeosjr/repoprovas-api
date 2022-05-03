import supertest from 'supertest';
import server from '../src/index.js';
import startTest from './startTest.js';
import { prisma } from '../src/db.js';
import { createUserBody, createUserDatabase } from './factories/userFactory.js';

describe('POST /users/create', () => {
    startTest();

    it("should return 201 and persist user in database given a valid body", async() => {
        const body = createUserBody();

        const res = await supertest(server).post('/users/create').send(body);
        const user = await prisma.users.findUnique({
            where: {
                email: body.email
            }
        });

        expect(res.status).toEqual(201);
        expect(user).not.toBeNull();
    });

    it("should return 422 given a invalid body", async() => {
        const body = {}

        const res = await supertest(server).post('/users/create').send(body);

		expect(res.status).toEqual(422);
    });

    it("should return 409 given a registered email address", async() => {
        const body = createUserBody();

        await supertest(server).post('/users/create').send(body);
        const res = await supertest(server).post('/users/create').send(body);
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

    it("should return 200 and a token given a valid body", async() => {
        const body = createUserBody();
        await createUserDatabase(body);

        const res = await supertest(server).post('/login').send(body);

        expect(res.status).toEqual(200);
        expect(typeof res.text).toEqual("string");
    });
    
    it("should return 401 given invalid credentials", async() => {
        const body = createUserBody();

        const res = await supertest(server).post('/login').send(body);

        expect(res.status).toEqual(401);
    })
});

describe('GET /content/teachers', () => {
    startTest();

    it.todo("should return 200 and a array with content given a valid token")
})

describe('GET /content/terms', () => {
    startTest();

    it.todo("should return 200 and a array with content given a valid token")
})

describe('GET /content/disciplines', () => {
    startTest();

    it.todo("should return 200 and a array with content given a valid token")
})

describe('GET /content/discipline/:name', () => {
    startTest();

    it.todo("should return 200 and a array with content given a valid params")
    it.todo("should return 404 given invalid params")
})

describe('GET /content/discipline/:id', () => {
	startTest();

	it.todo('should return 200 and a array with content given a valid params');
	it.todo('should return 404 given invalid params');
});

describe('GET /content/categories', () => {
	startTest();

	it.todo('should return 200 and a array with content given a valid token');
});

describe('POST /tests/create', () => {
    startTest();

    it.todo("should return 201 and persist test in database given valid body")
    it.todo("should return 422 given a invalid body")
})

describe('PATCH /test/:id', () => {
    startTest();

    it.todo("should return 200 given a valid token")
})