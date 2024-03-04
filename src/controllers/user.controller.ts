import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";

import { BaseController } from "../shared/controllers/Base.controller";
import { TOKENS } from "../shared/IoC/tokens";
import { IUserController, IUserService } from "../contracts/user.contract";

@injectable()
export class UserController extends BaseController implements IUserController {

  constructor(
    @inject(TOKENS.IUserService) private readonly userService: IUserService
  ) {
    super()
  }

  async insert(req: Request, res: Response): Promise<Response> {
    try {
      const {...newUser} = req.body;
      const newUserId = await this.userService.insert(newUser);
      return this.created(res, newUserId);
    } catch (error) {
      return this.fail(res, error as any);
    }
  }
  
  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const userId = parseInt(req.params.id);
      const user = await this.userService.getById(userId);
      return user ? this.ok(res, user) : this.notFound(res, "Usuario no encontrado");
    } catch (error) {
      return this.fail(res, error as any);
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const userId = parseInt(req.params.id);
      const {...updatedUser} = req.body;
      const user = await this.userService.update(userId, updatedUser);
      return user ? this.ok(res, user) : this.notFound(res, "Usuario no encontrado");
    } catch (error) {
      return this.fail(res, error as any);
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const userId = parseInt(req.params.id);
      const isDeleted = await this.userService.delete(userId);
      return isDeleted ? this.ok(res) : this.notFound(res, "Usuario no encontrado");
    } catch (error) {
      return this.fail(res, error as any);
    }
  }

  async getList(req: Request, res: Response): Promise<Response> {
    try {
      const allUsers = await this.userService.getList();
      return this.ok(res, allUsers);
    } catch (error) {
      return this.fail(res, error as any);
    }
  }

}