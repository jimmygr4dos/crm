import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";

import { BaseController } from "../shared/controllers/Base.controller";
import { TOKENS } from "../shared/IoC/tokens";
import { ICustomerController, ICustomerService } from "../contracts/customer.contract";

@injectable()
export class CustomerController extends BaseController implements ICustomerController {

  constructor(
    @inject(TOKENS.ICustomerService) private readonly customerService: ICustomerService
  ) {
    super()
  }

  async insert(req: Request, res: Response): Promise<Response> {
    try {
      const {...newCustomer} = req.body;
      const newCustomerId = await this.customerService.insert(newCustomer);
      return this.created(res, newCustomerId);
    } catch (error) {
      return this.fail(res, error as any);
    }
  }
  
  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const customerId = parseInt(req.params.id);
      const customer = await this.customerService.getById(customerId);
      return customer ? this.ok(res, customer) : this.notFound(res, "Cliente no encontrado");
    } catch (error) {
      return this.fail(res, error as any);
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const customerId = parseInt(req.params.id);
      const {...updatedCustomer} = req.body;
      const customer = await this.customerService.update(customerId, updatedCustomer);
      return customer ? this.ok(res, customer) : this.notFound(res, "Cliente no encontrado");
    } catch (error) {
      return this.fail(res, error as any);
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const customerId = parseInt(req.params.id);
      const isDeleted = await this.customerService.delete(customerId);
      return isDeleted ? this.ok(res) : this.notFound(res, "Cliente no encontrado");
    } catch (error) {
      return this.fail(res, error as any);
    }
  }

  async getList(req: Request, res: Response): Promise<Response> {
    try {
      const allCustomers = await this.customerService.getList();
      return this.ok(res, allCustomers);
    } catch (error) {
      return this.fail(res, error as any);
    }
  }

}