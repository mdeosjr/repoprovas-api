import { Router } from 'express';
import { validateSchema } from '../middlewares/validateSchema.js';
import userDataSchema from '../schemas/userDataSchema.js';
import * as authController from '../controllers/authController.js';

const authRouter = Router();

authRouter.post('/login', validateSchema(userDataSchema), authController.login)

export default authRouter;
