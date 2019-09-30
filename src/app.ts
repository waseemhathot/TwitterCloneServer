import express from 'express';
import cors from 'cors';
import controllers from './controllers';
// import expressWinston from 'express-winston';
// import { createExpressWinstonOptions } from './utils/logger';
import { initPassport } from './utils/passport';

initPassport();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(expressWinston.logger(createExpressWinstonOptions()));

controllers.forEach(o => app.use(`/api${o.prefix}`, o.router));

// app.use(expressWinston.errorLogger(createExpressWinstonOptions()));

// app.use(error);

export default app;
