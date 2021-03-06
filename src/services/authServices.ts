import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserData } from '../controllers/userController.js';
import * as userRepository from '../repositories/userRepository.js';

export async function login(userLogin: UserData) {
    const { email, password } = userLogin;

    const user = await userRepository.findByEmail(email);
    if (!user) throw { type: 'unauthorized', message: 'User not found!' };

    if (bcrypt.compareSync(password, user.password)) {
        const data = { userId: user.id };
        const secretKey = process.env.JWT_SECRET;
        const config = { expiresIn: 60*60*24 };

        const token = jwt.sign(data, secretKey, config);
        return token;
    }

    throw { type: 'unauthorized', message: 'User or password incorrect!' };
}