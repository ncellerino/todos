import User, { IUser, UserDTO } from '../models/User';
import { IBaseRepository } from '../repository/interfaces/IBaseRepository';
import TYPES from '../types';
import { injectable, inject } from 'inversify';
export interface IUserService {
  getAll(): Promise<UserDTO[]>;
  create(data: UserDTO): Promise<UserDTO>;
  getById(id: string | undefined): Promise<UserDTO | null>;
  update(id: string, data: UserDTO): Promise<UserDTO | null>;
  delete(id: string): Promise<UserDTO | null>;
}

@injectable()
export class UserServiceImpl implements IUserService {
  @inject(TYPES.UserRepository)
  private userRepository!: IBaseRepository<IUser>;

  async getById(id: string | undefined): Promise<UserDTO | null> {
    let userDto: UserDTO | null = null;
    if (id) {
      const user: IUser | null = await this.userRepository.findById(id);
      userDto = this.toDTO(user);
    }
    return userDto;
  }

  async getAll(): Promise<UserDTO[]> {
    const users: IUser[] = await this.userRepository.findAll();
    return users.map((user) => this.toDTO(user));
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
      email: user!.email,
    };
  }

  private toModel(dto: UserDTO): IUser {
    return new User({
      _id: dto._id,
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
    });
  }
}
