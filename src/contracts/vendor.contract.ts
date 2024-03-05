import { Request, Response } from "express";

import { IRepository, RepositoryResult } from "../shared/utils/repository";
import { Vendor } from "../models/vendor.model";

export interface IVendor {
  id: number;
  firstName: string;
  lastName: string;
  personalPhone: number;
  businessPhone: number;
  personalEmail: string;
  businessEmail: string;
  commissionPercentage: number;
  currencyTypeId: number;
  salesQuota: number;
  observation: string;
  status: number;
  createdAt: Date;
  createdBy: number | null;
  modifiedAt: Date | null; 
  modifiedBy: number | null; 
}

export interface IVendorRepository extends IRepository<Vendor> {
}

export interface IVendorService {
  insert(newVendor: IVendor): Promise<RepositoryResult<number>>;
  getById(id: number): Promise<RepositoryResult<IVendor>>;
  update(id: number, updatedVendor: Partial<IVendor>): Promise<RepositoryResult<boolean>>;
  delete(id: number): Promise<RepositoryResult<boolean>>;
  getList(): Promise<RepositoryResult<IVendor[]>>;
}

export interface IVendorController {
  insert(req: Request, res: Response): Promise<Response>;
  getById(req: Request, res: Response): Promise<Response>;
  update(req: Request, res: Response): Promise<Response>;
  delete(req: Request, res: Response): Promise<Response>;
  getList(req: Request, res: Response): Promise<Response>;
}