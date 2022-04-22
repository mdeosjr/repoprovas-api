import { UserData } from "../controllers/userController.js";
import { prisma } from "../db.js";

export async function insert(createUser: UserData) {
    await prisma.users.create({
        data: createUser
    })
}

export async function findByEmail(email: string) {
    return await prisma.users.findUnique({
        where: { email }
    })
}

export async function findById(userId: number) {
    return await prisma.users.findFirst({
        where: { id: userId }
    })
}