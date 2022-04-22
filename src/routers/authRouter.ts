import { Router } from 'express';
import { validateSchema } from '../middlewares/validateSchema.js';
import userDataSchema from '../schemas/userDataSchema.js';
import * as authController from '../controllers/authController.js';
import { validateToken } from '../middlewares/validateToken.js';

const authRouter = Router();

authRouter.post('/login', validateSchema(userDataSchema), authController.login)
authRouter.post('/logout', validateToken)

export default authRouter;
