import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/../../../.env' });

import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { errors } from 'celebrate';
import routes from '@shared/http/routes';
import '@shared/typeorm';

const port = process.env.Port;
const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use(errors());

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'Error',
      message: error.message,
    });
  }

  return res.status(500).json({
    status: 'Error',
    message: 'Internal Server Error',
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
