import { injectable } from "tsyringe";

import { Repository, RepositoryResult } from "../../shared/utils/repository";
import { AppDataSource } from "../../../config/database";
import { Contact } from "../models/contact.model";
import { IContactRepository } from "../contracts/contact.contract";

@injectable()
export class ContactRepository extends Repository<Contact> implements IContactRepository
{
  constructor() { super(AppDataSource, Contact) }

  async getByCustomerId(customerId: number): Promise<RepositoryResult<Contact[]>> {
    try {
      const result = await this.getListByCondition({ customerId });
      return { success: true, data: result };
    } catch (error) {
      console.error(`Error al obtener por Cliente en ${Contact.name}`, error);
      const repositoryError = this.createRepositoryError("Error al obtener por Cliente", "getByCustomerId");
      return { success: false, error: repositoryError };
    }
  }

}
