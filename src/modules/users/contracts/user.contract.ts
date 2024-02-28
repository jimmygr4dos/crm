import { Request, Response } from "express";

import { IRepository, RepositoryResult } from '../../shared/utils/repository';
import { User } from "../models/user.model";

export interface IUser {
  id: number;
  username: string;
  password: string;
  createdAt: Date;
  authStrategy: string;
}

export interface IUserRepository extends IRepository<User> {
  // ValidaterUser(email: string, password: string): Promise<User | null>;
}

export interface IUserService {
  insert(newUser: IUser): Promise<RepositoryResult<number>>;
  getById(id: number): Promise<RepositoryResult<IUser>>;
  update(id: number, updatedUser: Partial<IUser>): Promise<RepositoryResult<boolean>>;
  delete(id: number): Promise<RepositoryResult<boolean>>;
  getList(): Promise<RepositoryResult<IUser[]>>;
}

export interface IUserController {
  insert(req: Request, res: Response): Promise<Response>;
  getById(req: Request, res: Response): Promise<Response>;
  update(req: Request, res: Response): Promise<Response>;
  delete(req: Request, res: Response): Promise<Response>;
  getList(req: Request, res: Response): Promise<Response>;
}