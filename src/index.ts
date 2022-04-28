import express, { json } from 'express';
import './setup.js';
import 'express-async-errors';
import cors from 'cors';
import router from './routers/routes.js';
import errorHandler from './middlewares/errorHandlingMiddleware.js';

const server = express();

server.use(cors());
server.use(json());
server.use(router);
server.use(errorHandler);

export default server;