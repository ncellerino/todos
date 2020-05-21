import User, { IUser, UserDTO } from "../models/User";
import { IBaseRepository } from "../repository/interfaces/IBaseRepository";
import TYPES from "../types";
import { injectable, inject } from "inversify";
export interface IUserService {
  getAll(): Promise<Array<UserDTO>>;
  create(data: UserDTO): Promise<UserDTO>;
  getById(id: string): Promise<UserDTO | null>;
  update(id: string, data: UserDTO): Promise<UserDTO | null>;
  delete(id: string): Promise<UserDTO | null>;
}

@injectable()
export class TodoServiceImpl implements IUserService {
  @inject(TYPES.TodoRepository)
  private userRepository!: IBaseRepository<IUser>;

  async getById(id: string): Promise<UserDTO | null> {
    let user: IUser | null = await this.userRepository.findById(id);
    return this.toDTO(user);
  }

  async getAll(): Promise<Array<UserDTO>> {
    let users: IUser[] = await this.userRepository.findAll();
    return users.map(user => this.toDTO(user));
  }

  create(data: UserDTO): Promise<UserDTO> {
    return this.userRepository.create(this.toModel(data));
  }

  update(id: string, data: UserDTO): Promise<UserDTO | null> {
    data._id = id;
    return this.userRepository.update(id, this.toModel(data));
  }

  delete(id: string): Promise<UserDTO | null> {
    return this.userRepository.delete(id);
  }

  private toDTO(user: IUser | null): UserDTO {
    return {
      _id: user!._id,
      firstName: user!.firstName,
      lastName: user!.lastName,
      email: user!.email
    };
  }

  private toModel(dto: UserDTO): IUser {
    return new User({
      _id: dto._id,
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email
    });
  }
}
