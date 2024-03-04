import { injectable, inject } from 'tsyringe';

import { TOKENS } from '../shared/IoC/tokens';
import { RepositoryResult } from '../shared/utils/repository';
import { ICustomer, ICustomerRepository, ICustomerService } from '../contracts/customer.contract';

@injectable()
export class CustomerService implements ICustomerService {

  constructor(@inject(TOKENS.ICustomerRepository) private readonly customerRepository: ICustomerRepository) {}

  async insert(newCustomer: ICustomer): Promise<RepositoryResult<number>> {
    return this.customerRepository.insert(newCustomer);
  }

  async getById(id: number): Promise<RepositoryResult<ICustomer>> {
    return this.customerRepository.getById(id);
  }

  async update(id: number, updatedCustomer: Partial<ICustomer>): Promise<RepositoryResult<boolean>> {
    return await this.customerRepository.update(id, updatedCustomer);
  }

  async delete(id: number): Promise<RepositoryResult<boolean>> {
    return this.customerRepository.delete(id);
  }

  async getList(): Promise<RepositoryResult<ICustomer[]>> {
    return this.customerRepository.getList();
  }
}
