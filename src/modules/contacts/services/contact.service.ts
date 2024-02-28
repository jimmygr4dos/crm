import { injectable, inject } from 'tsyringe';

import { TOKENS } from '../../shared/IoC/tokens';
import { RepositoryResult } from '../../shared/utils/repository';
import { IContactService, IContactRepository, IContact } from '../contracts/contact.contract';

@injectable()
export class ContactService implements IContactService {

  constructor(@inject(TOKENS.IContactRepository) private readonly contactRepository: IContactRepository) {}

  async insert(newContact: IContact): Promise<RepositoryResult<number>> {
    return this.contactRepository.insert(newContact);
  }

  async getById(id: number): Promise<RepositoryResult<IContact>> {
    return this.contactRepository.getById(id);
  }

  async update(id: number, updatedContact: Partial<IContact>): Promise<RepositoryResult<boolean>> {
    return await this.contactRepository.update(id, updatedContact);
  }

  async delete(id: number): Promise<RepositoryResult<boolean>> {
    return this.contactRepository.delete(id);
  }

  async getList(): Promise<RepositoryResult<IContact[]>> {
    return this.contactRepository.getList();
  }

  async getByCustomerId(customerId: number): Promise<RepositoryResult<IContact[]>> {
    return this.contactRepository.getByCustomerId(customerId);
  }
}
