import { Router } from 'express';
import { validateToken } from '../middlewares/validateToken.js';
import * as contentController from '../controllers/contentController.js';

const contentRouter = Router();

contentRouter.get('/content/teachers', validateToken, contentController.getContent)

export default contentRouter;