import User, { IUser, UserAuthDTO, UserDTO, UserCredentialsDTO } from '../models/User';
import TYPES from '../types';
import { injectable, inject } from 'inversify';
import { IUserRepository } from '../repository/UserRepository';
import jwt from 'jsonwebtoken';
export interface IAuthService {
  login(user: UserCredentialsDTO): Promise<UserDTO | null>;
  register(user: UserAuthDTO): Promise<UserDTO>;
}

@injectable()
export class AuthServiceImpl implements IAuthService {
  @inject(TYPES.UserRepository)
  private userRepository!: IUserRepository;

  async login(credentials: UserCredentialsDTO): Promise<UserDTO | null> {
    const user = await this.userRepository.authenticate(credentials.email, credentials.password);
    let dto = null;
    if (user) {
      dto = this.toDTO(user);
      dto.token = this.signToken(user);
    }
    return dto;
  }

  async register(user: UserAuthDTO): Promise<UserDTO> {
    const userRegistered: IUser = await this.userRepository.register(this.toModel(user), user.password);
    const dto = this.toDTO(userRegistered);
    dto.token = this.signToken(userRegistered);
    return dto;
  }

  private signToken(user: IUser): string {
    return jwt.sign({ id: user.id, email: user.email }, 'ILovePokemon');
  }

  private toDTO(user: IUser | null): UserDTO {
    return {
      _id: user!._id,
      firstName: user!.firstName,
      lastName: user!.lastName,
      email: user!.email,
    };
  }

  private toModel(dto: UserAuthDTO): IUser {
    return new User({
      _id: dto._id,
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
    });
  }
}
