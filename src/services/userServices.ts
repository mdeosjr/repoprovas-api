import bcrypt from 'bcrypt';
import { UserData } from "../controllers/userController.js";
import * as userRepository from "../repositories/userRepository.js";

export async function create(createUser: UserData) {
    const { email, password } = createUser;

    const existentUser = await userRepository.findByEmail(email);
    if (existentUser) throw { type: 'conflict', message: 'User already exists!' }

    const hashPassword = bcrypt.hashSync(password, 8)
    await userRepository.insert({
        email,
        password: hashPassword,
	});
}
