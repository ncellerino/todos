import { UserDTO } from '../../models/User';
import { IUserService } from '../../services/UserService';
import { inject, injectable } from 'inversify';
import { interfaces } from 'inversify-express-utils';
import TYPES from '../../types';
import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { Principal } from './Principal';

@injectable()
export class AuthProvider implements interfaces.AuthProvider {
  @inject(TYPES.UserService)
  private userService!: IUserService;

  async getUser(
    req: Request<ParamsDictionary, any, any, ParsedQs>,
    res: Response<any>,
    next: NextFunction,
  ): Promise<interfaces.Principal> {
    const token = req.header('x-auth-token');
    let user: UserDTO | null = null;
    if (token) {
      user = await this.userService.getById(token);
    }
    const principal = new Principal(user);

    return principal;
  }
}
