import { Router } from 'express';
import authRouter from './authRouter.js';
import contentRouter from './contentRouter.js';
import userRouter from './userRouter.js';

const router = Router();

router.use(userRouter);
router.use(authRouter);
router.use(contentRouter);

export default router;
