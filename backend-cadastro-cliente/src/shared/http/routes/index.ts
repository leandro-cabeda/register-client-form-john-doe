import { Router } from 'express';
import customersRouter from '@modules/customers/routes/customers.routes';

const routes = Router();

routes.get('/', (req, res) => {
  res.status(200).json({ status: 'Success', message: 'Welcome Api!' });
});


routes.use('/customers', customersRouter);

export default routes;
