import { Request, Response } from 'express';
import CreateCustomerService from '@modules/customers/services/CreateCustomerService';

export default class CustomersController {

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, cpf, color, observation } = request.body;

    const createCustomerService = new CreateCustomerService();
    const customer = await createCustomerService.execute({
      name,
      email,
      cpf,
      color,
      observation,
    });

    return response.status(201).json({ customer });
  }
}
