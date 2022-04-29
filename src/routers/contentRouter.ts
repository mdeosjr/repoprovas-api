import { Router } from 'express';
import { validateToken } from '../middlewares/validateToken.js';
import * as contentController from '../controllers/contentController.js';

const contentRouter = Router();

contentRouter.get(
	'/content/teachers',
	validateToken,
	contentController.getContentByTeachers
);

contentRouter.get(
	'/content/terms',
	validateToken,
	contentController.getContentByTerms
);

contentRouter.get(
	'/content/disciplines',
	validateToken,
	contentController.getContentByDisciplines
);

contentRouter.get(
	'/content/categories',
	validateToken,
	contentController.getCategoriesList
);

contentRouter.post(
	'/tests/create',
	validateToken,
	contentController.createTest
);

export default contentRouter;
