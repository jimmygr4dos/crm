import { container } from "tsyringe";

import { TOKENS } from "./tokens";
import { UserController } from "../../users/controllers/user.controller";
import { UserService } from "../../users/services/user.service";
import { UserRepository } from "../../users/repositories/user.repository";
import { CustomerController } from "../../customers/controllers/customer.controller";
import { CustomerService } from "../../customers/services/customer.service";
import { CustomerRepository } from "../../customers/repositories/customer.repository";
import { ContactController } from "../../contacts/controllers/contact.controller";
import { ContactService } from "../../contacts/services/contact.service";
import { ContactRepository } from "../../contacts/repositories/contact.repository";

container.register(TOKENS.IUserController, { useClass: UserController });
container.register(TOKENS.IUserService, { useClass: UserService });
container.register(TOKENS.IUserRepository, { useClass: UserRepository });

container.register(TOKENS.ICustomerController, { useClass: CustomerController });
container.register(TOKENS.ICustomerService, { useClass: CustomerService });
container.register(TOKENS.ICustomerRepository, { useClass: CustomerRepository });

container.register(TOKENS.IContactController, { useClass: ContactController });
container.register(TOKENS.IContactService, { useClass: ContactService });
container.register(TOKENS.IContactRepository, { useClass: ContactRepository });

export { container };