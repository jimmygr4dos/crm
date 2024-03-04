import { container } from "tsyringe";

import { TOKENS } from "./tokens";
import { UserController } from "../../controllers/user.controller";
import { UserService } from "../../services/user.service";
import { UserRepository } from "../../repositories/user.repository";
import { CustomerController } from "../../controllers/customer.controller";
import { CustomerService } from "../../services/customer.service";
import { CustomerRepository } from "../../repositories/customer.repository";
import { ContactController } from "../../controllers/contact.controller";
import { ContactService } from "../../services/contact.service";
import { ContactRepository } from "../../repositories/contact.repository";

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