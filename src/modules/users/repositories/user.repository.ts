import { injectable } from "tsyringe";

import { Repository } from "../../shared/utils/repository";
import { AppDataSource } from "../../../config/database";
import { IUserRepository } from "../contracts/user.contract";
import { User } from "../models/user.model";

@injectable()
export class UserRepository extends Repository<User> implements IUserRepository {

  constructor() { super(AppDataSource, User) }

}
