import { Request, Response } from "express";

import { IRepository, RepositoryResult } from '../../shared/utils/repository';
import { Customer } from "../models/customer.model";

export interface ICustomer {
  id: number;
  tinNumber: string;
  companyName: string;
  address: string;
  createdAt: Date;
  createdBy: string;
}

export interface ICustomerRepository extends IRepository<Customer> {
}

export interface ICustomerService {
  insert(newCustomer: ICustomer): Promise<RepositoryResult<number>>;
  getById(id: number): Promise<RepositoryResult<ICustomer>>;
  update(id: number, updatedCustomer: Partial<ICustomer>): Promise<RepositoryResult<boolean>>;
  delete(id: number): Promise<RepositoryResult<boolean>>;
  getList(): Promise<RepositoryResult<ICustomer[]>>;
}

export interface ICustomerController {
  insert(req: Request, res: Response): Promise<Response>;
  getById(req: Request, res: Response): Promise<Response>;
  update(req: Request, res: Response): Promise<Response>;
  delete(req: Request, res: Response): Promise<Response>;
  getList(req: Request, res: Response): Promise<Response>;
}