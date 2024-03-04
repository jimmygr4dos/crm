import { injectable } from "tsyringe";

import { Repository } from "../shared/utils/repository";
import { AppDataSource } from "../config/database";
import { ICustomerRepository } from "../contracts/customer.contract";
import { Customer } from "../models/customer.model";

@injectable()
export class CustomerRepository extends Repository<Customer> implements ICustomerRepository
{
  constructor() { super(AppDataSource, Customer) }

}
