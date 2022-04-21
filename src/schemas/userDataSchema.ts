import joi from 'joi';
import { UserData } from '../controllers/userController';

const userDataSchema = joi.object<UserData>({
    email: joi.string().required(),
    password: joi.string().required()
})

export default userDataSchema;