import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import CustomersController from '@modules/customers/controllers/CustomersController';

const router = Router();

const customersController = new CustomersController();

router.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().optional().allow(''),
      cpf: Joi.string().required(),
      color: Joi.string().required(),
      observation: Joi.string().optional().allow(''),
    },
  }),
  customersController.create,
);

export default router;
