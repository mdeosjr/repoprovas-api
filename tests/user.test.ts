import supertest from 'supertest';
import server from '../src/index.js';
import startTest from './startTest.js';
import { prisma } from '../src/db.js';
import { createUserBody, createUserDatabase } from './factories/userFactory.js';

describe('POST /users/create', () => {
    startTest();

    it("should return 201 and persist user in database given a valid body", async () => {
        const body = createUserBody();

        const res = await supertest(server).post('/users/create').send(body);
        const user = await prisma.users.findUnique({
            where: {
                email: body.email
            }
        });

        expect(res.status).toEqual(201);
        expect(user).not.toBeNull();
    })

    it.todo("should return 422 given a invalid body")
    it.todo("should return 409 given a registered email address")
});

describe('POST /sign-in', () => {
    startTest();

    it.todo("should return 200 and a token given a valid body")
    it.todo("should return 401 given invalid credentials")
});

