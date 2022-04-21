import { prisma } from '../db.js';

export async function createSession(userId: number) {
    return await prisma.sessions.create({
        data: { userId }
    })
}

export async function findSession(sessionId: number) {
    return await prisma.sessions.findFirst({
        where: { id: sessionId }
    })
}