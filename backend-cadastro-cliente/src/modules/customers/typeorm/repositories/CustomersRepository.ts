import { EntityRepository, Repository } from 'typeorm';
import Customer from '@modules/customers/typeorm/entities/Customer';

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {
  public async findByName(name: string): Promise<Customer | undefined> {
    return await this.findOne({
      where: {
        name,
      },
    });
  }

  public async findById(id: string): Promise<Customer | undefined> {
    return await this.findOne({
      where: {
        id,
      },
    });
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    return await this.findOne({
      where: {
        email,
      },
    });
  }

  public async findByCpf(cpf: string): Promise<Customer | undefined> {
    return await this.findOne({
      where: {
        cpf,
      },
    });
  }
}
