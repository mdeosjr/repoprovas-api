import { Router } from 'express';
import { validateToken } from '../middlewares/validateToken.js';
import { validateSchema } from '../middlewares/validateSchema.js';
import testDataSchema from '../schemas/testDataSchema.js';
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
	contentController.getDisciplinesList
);

contentRouter.get(
	'/content/discipline/:name',
	validateToken,
	contentController.getDisciplinesByName
);

contentRouter.get(
	'/content/disciplines/:id',
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
	validateSchema(testDataSchema),
	contentController.createTest
);

contentRouter.patch(
	'/test/:id',
	validateToken,
	contentController.updateTestViews
);

export default contentRouter;
