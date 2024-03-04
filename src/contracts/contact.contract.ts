import { Request, Response } from "express";

import { IRepository, RepositoryResult } from "../shared/utils/repository";
import { Contact } from "../models/contact.model";

export interface IContact {
  id: number;
  firstName: string;
  lastName: string;
  personalEmail: string;
  businessEmail: string;
  customerId: number;
  createdAt: Date;
  createdBy: string;
}

export interface IContactRepository extends IRepository<Contact> {
  getByCustomerId(customerId: number): Promise<RepositoryResult<Contact[]>>;
}

export interface IContactService {
  insert(newContact: IContact): Promise<RepositoryResult<number>>;
  getById(id: number): Promise<RepositoryResult<IContact>>;
  update(id: number, updatedContact: Partial<IContact>): Promise<RepositoryResult<boolean>>;
  delete(id: number): Promise<RepositoryResult<boolean>>;
  getList(): Promise<RepositoryResult<IContact[]>>;
  getByCustomerId(customerId: number): Promise<RepositoryResult<Contact[]>>;
}

export interface IContactController {
  insert(req: Request, res: Response): Promise<Response>;
  getById(req: Request, res: Response): Promise<Response>;
  update(req: Request, res: Response): Promise<Response>;
  delete(req: Request, res: Response): Promise<Response>;
  getList(req: Request, res: Response): Promise<Response>;
  getByCustomerId(req: Request, res: Response): Promise<Response>;
}