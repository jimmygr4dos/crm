import { injectable, inject } from 'tsyringe';

import { TOKENS } from '../shared/IoC/tokens';
import { RepositoryResult } from '../shared/utils/repository';
import { IUser, IUserRepository, IUserService } from '../contracts/user.contract';

@injectable()
export class UserService implements IUserService {

  constructor(@inject(TOKENS.IUserRepository) private readonly userRepository: IUserRepository) {}

  async insert(newUser: IUser): Promise<RepositoryResult<number>> {
    return this.userRepository.insert(newUser);
  }

  async getById(id: number): Promise<RepositoryResult<IUser>> {
    return this.userRepository.getById(id);
  }

  async update(id: number, updatedUser: Partial<IUser>): Promise<RepositoryResult<boolean>> {
    return await this.userRepository.update(id, updatedUser);
  }

  async delete(id: number): Promise<RepositoryResult<boolean>> {
    return this.userRepository.delete(id);
  }

  async getList(): Promise<RepositoryResult<IUser[]>> {
    return this.userRepository.getList();
  }
}
