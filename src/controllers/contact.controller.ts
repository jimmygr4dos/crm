import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";

import { BaseController } from "../shared/controllers/Base.controller";
import { TOKENS } from "../shared/IoC/tokens";
import { IContactController, IContactService } from "../contracts/contact.contract";

@injectable()
export class ContactController extends BaseController implements IContactController {

  constructor(
    @inject(TOKENS.IContactService) private readonly contactService: IContactService
  ) {
    super()
  }

  async insert(req: Request, res: Response): Promise<Response> {
    try {
      const {...newContact} = req.body;
      const newContactId = await this.contactService.insert(newContact);
      return this.created(res, newContactId);
    } catch (error) {
      return this.fail(res, error as any);
    }
  }
  
  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const contactId = parseInt(req.params.id);
      const contact = await this.contactService.getById(contactId);
      return contact ? this.ok(res, contact) : this.notFound(res, "Contacto no encontrado");
    } catch (error) {
      return this.fail(res, error as any);
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const contactId = parseInt(req.params.id);
      const {...updatedContact} = req.body;
      const contact = await this.contactService.update(contactId, updatedContact);
      return contact ? this.ok(res, contact) : this.notFound(res, "Contacto no encontrado");
    } catch (error) {
      return this.fail(res, error as any);
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const contactId = parseInt(req.params.id);
      const isDeleted = await this.contactService.delete(contactId);
      return isDeleted ? this.ok(res) : this.notFound(res, "Contacto no encontrado");
    } catch (error) {
      return this.fail(res, error as any);
    }
  }

  async getList(req: Request, res: Response): Promise<Response> {
    try {
      const allContacts = await this.contactService.getList();
      return this.ok(res, allContacts);
    } catch (error) {
      return this.fail(res, error as any);
    }
  }

  async getByCustomerId(req: Request, res: Response): Promise<Response> {
    try {
      const customerId = parseInt(req.params.customerId);
      const contacts = await this.contactService.getByCustomerId(customerId);
      return this.ok(res, contacts);
    } catch (error) {
      return this.fail(res, error as any);
    }
  }

}