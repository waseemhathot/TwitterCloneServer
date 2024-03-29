import express from 'express';
import cors from 'cors';
import controllers from './controllers';
import { initPassport } from './utils/passport';
import storeMiddleware from './middleware/store';
import { validationErrorHandler } from './middleware/error-handler';

initPassport();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(storeMiddleware());

controllers.forEach(o => app.use(`/api${o.prefix}`, o.router));

app.use(validationErrorHandler());

export default app;
