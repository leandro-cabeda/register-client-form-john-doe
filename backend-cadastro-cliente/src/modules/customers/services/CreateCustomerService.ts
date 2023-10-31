import AppError from '@shared/errors/AppError';
import { CustomerRepository } from '@modules/customers/typeorm/repositories/CustomersRepository';
import { getCustomRepository } from 'typeorm';
import IRequest from '@metadata/customers/IRequest';
import Customer from '@modules/customers/typeorm/entities/Customer';

class CreateCustomerService {
  public async execute(iRequestCustomer: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomerRepository);
    const { email, cpf } = iRequestCustomer;

    const cpfExists = await customersRepository.findByCpf(cpf);
    if (cpfExists) throw new AppError('CPF already used.');

    const emailExists = await customersRepository.findByEmail(email);
    if (emailExists) throw new AppError('Email address already used.');

    const customer = customersRepository.create({
      ...iRequestCustomer
    });

    const customerCreate = await customersRepository.save(customer);

    return customerCreate;
  }
}

export default CreateCustomerService;
