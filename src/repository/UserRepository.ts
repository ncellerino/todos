import { BaseRepositoryImpl } from "./BaseRepositoryImpl";
import User, { IUser, UserDTO } from "../models/User";
import { IBaseRepository } from "./interfaces/IBaseRepository";

export interface IUserRepository extends IBaseRepository<IUser> {
  register(model: IUser, password: string): Promise<IUser>;
  authenticate(email: string, password: string): Promise<IUser>;
}
export class UserRepository extends BaseRepositoryImpl<IUser> {
  constructor() {
    super(User);
  }

  async register(model: IUser, password: string): Promise<IUser> {
    const user: IUser = await User.register(new User(model), password);
    return user;
  }

  async authenticate(email: string, password: string): Promise<IUser | null> {
    const { user, error } = await User.authenticate()(email, password);
    if (error) {
      return null;
    } else {
      return user;
    }
  }
}
