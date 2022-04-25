import express, { json } from 'express';
import 'express-async-errors';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routers/routes.js';
import errorHandler from './middlewares/errorHandlingMiddleware.js';
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const server = express();

server.use(cors());
server.use(json());
server.use(router);
server.use(errorHandler);

const PORT = process.env.PORT || 4000;
server.listen(PORT);