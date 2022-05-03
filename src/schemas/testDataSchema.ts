import joi from 'joi';
import { CreateTest } from '../controllers/contentController.js';

const testDataSchema = joi.object<CreateTest>({
    name: joi.string().required(),
	pdfUrl: joi.string().required(),
	category: joi.string().required(),
	discipline: joi.string().required(),
	teacher: joi.string().required()
})

export default testDataSchema;