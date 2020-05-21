import { BaseRepositoryImpl } from "./BaseRepositoryImpl";
import User, { IUser } from "../models/User";

export class UserRepository extends BaseRepositoryImpl<IUser> {
  constructor() {
    super(User);
  }
}
