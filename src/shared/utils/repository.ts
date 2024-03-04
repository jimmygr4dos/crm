import {
  DeepPartial,
  EntityTarget,
  ObjectLiteral,
  DataSource,
  FindOneOptions,
  FindOptionsWhere,
  Repository as TypeORMRepository,
} from "typeorm";

// export interface IRepository<T> {
//   insert(entity: T): Promise<number | undefined>;
//   getById(id: number): Promise<T | null | undefined>;
//   update(id: number, entity: DeepPartial<T>): Promise<boolean | undefined>;
//   delete(id: number): Promise<boolean | undefined>;
//   getList(): Promise<T[] | undefined>;
// }

export class RepositoryError extends Error {
  constructor(message: string, public readonly repositoryName: string, public readonly operation: string) {
    super(message);
    this.name = "RepositoryError";
  }
}

export type RepositoryResult<T> = {
  success: boolean;
  data?: T;
  error?: RepositoryError;
};

export interface IRepository<T> {
  insert(entity: T): Promise<RepositoryResult<number>>;
  getById(id: number): Promise<RepositoryResult<T>>;
  update(id: number, entity: DeepPartial<T>): Promise<RepositoryResult<boolean>>;
  delete(id: number): Promise<RepositoryResult<boolean>>;
  getList(): Promise<RepositoryResult<T[]>>;
}

export class Repository<T extends ObjectLiteral> implements IRepository<T> {
  private readonly repository: TypeORMRepository<T>;

  constructor(private readonly myDataSource: DataSource, private readonly myEntityTarget: EntityTarget<T>) {
    this.repository = myDataSource.getRepository(myEntityTarget);
  }

  protected createRepositoryError(message: string, operation: string): RepositoryError {
    return new RepositoryError(message, this.myEntityTarget.toString(), operation);
  }

  async insert(entity: T): Promise<RepositoryResult<number>> {
    try {
      const newEntity = this.repository.create(entity);
      const savedEntity = await this.repository.save(newEntity);
      return { success: true, data: savedEntity.id };
    } catch (error) {
      console.error(`Error al insertar en ${this.myEntityTarget.toString()}`, error);
      const repositoryError = this.createRepositoryError("Error al insertar entidad", "insert");
      return { success: false, error: repositoryError };
    }
  }

  async getById(id: number): Promise<RepositoryResult<T>> {
    try {
      const findOptions: FindOneOptions<T> = {
        where: { id } as FindOptionsWhere<T | unknown>,
      };
      const entity = await this.repository.findOne(findOptions);
      if (entity) {
        return { success: true, data: entity };
      } else {
        const repositoryError = this.createRepositoryError("Entidad no encontrada", "getById");
        return { success: false, error: repositoryError };
      }
    } catch (error) {
      console.error(`Error al obtener por ID en ${this.myEntityTarget.toString()}`, error);
      const repositoryError = this.createRepositoryError("Error al obtener entidad por ID", "getById");
      return { success: false, error: repositoryError };
    }
  }

  async update(id: number, updatedData: DeepPartial<T>): Promise<RepositoryResult<boolean>> {
    try {
      const result = await this.getById(id);
      if (result.success) {
        const entity = result.data!;
        this.repository.merge(entity, updatedData);
        await this.repository.save(entity);
        return { success: true, data: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error(`Error al actualizar en ${this.myEntityTarget.toString()}`, error);
      const repositoryError = this.createRepositoryError("Error al actualizar entidad", "update");
      return { success: false, error: repositoryError };
    }
  }

  async delete(id: number): Promise<RepositoryResult<boolean>> {
    try {
      const result = await this.getById(id);
      if (result.success) {
        const entity = result.data!;
        await this.repository.remove(entity);
        return { success: true, data: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error(`Error al eliminar en ${this.myEntityTarget.toString()}`, error);
      const repositoryError = this.createRepositoryError("Error al eliminar entidad", "delete");
      return { success: false, error: repositoryError };
    }
  }

  async getList(): Promise<RepositoryResult<T[]>> {
    try {
      const entities = await this.repository.find();
      return { success: true, data: entities };
    } catch (error) {
      console.error(`Error al obtener los datos de ${this.myEntityTarget.toString()}`, error);
      const repositoryError = this.createRepositoryError("Error al obtener lista de entidades", "getList");
      return { success: false, error: repositoryError };
    }
  }

  protected async getListByCondition(condition: object): Promise<T[]> {
    try {
      return await this.repository.find({ where: condition });
    } catch (error) {
      throw new RepositoryError("Error al obtener lista por condición", this.myEntityTarget.toString(), "getListByCondition");
    }
  }

  // async insert(entity: T): Promise<number | undefined> {
  //   try {      
  //     const newEntity = this.repository.create(entity);
  //     const savedEntity = await this.repository.save(newEntity);
  //     return savedEntity.id;
  //   } catch (error) {
  //     console.error(`Error al insertar en ${this.myEntityTarget.toString()}`, error);      
  //   }
  // }

  // async getById(id: number): Promise<T | null | undefined> {
  //   try {      
  //     const findOptions: FindOneOptions<T> = {
  //       where: { id } as FindOptionsWhere<T | unknown>,
  //     };
  //     return (await this.repository.findOne(findOptions)) as T | null;
  //   } catch (error) {
  //     console.error(`Error al obtener por ID en ${this.myEntityTarget.toString()}`, error);      
  //   }
  // }

  // async update(id: number, updatedData: DeepPartial<T>): Promise<boolean | undefined> {
  //   try {      
  //     const entity = await this.getById(id);
  //     if (!entity) {
  //       return false;
  //     }
  //     this.repository.merge(entity, updatedData);
  //     await this.repository.save(entity);
  //     return true;
  //   } catch (error) {
  //     console.error(`Error al actualizar en ${this.myEntityTarget.toString()}`, error);      
  //   }
  // }

  // async delete(id: number): Promise<boolean | undefined> {
  //   try {      
  //     const entity = await this.getById(id);
  //     if (entity) {
  //       await this.repository.remove(entity);
  //       return true;
  //     }
  //     return false;
  //   } catch (error) {
  //     console.error(`Error al eliminar en ${this.myEntityTarget.toString()}`, error);      
  //   }
  // }

  // async getList(): Promise<T[] | undefined> {
  //   try {
  //     return await this.repository.find();
  //   } catch (error) {
  //     console.error(`Error al obtener los datos de ${this.myEntityTarget.toString()}`, error);
  //   }
  // }

}
