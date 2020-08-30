import { httpPost, controller } from 'inversify-express-utils';
import { inject } from 'inversify';
import { Request, Response } from 'express';
import { BaseController } from './BaseController';
import { HTTP401Error } from '../utils/httpErrors/Http401Error';
import { HTTP400Error } from '../utils/httpErrors/Http400Error';
import { IAuthService } from '../services/AuthService';
import TYPES from '../types';
import { UserDTO } from '../models/User';

@controller('/auth')
export class AuthController extends BaseController {
  @inject(TYPES.AuthService)
  private authService!: IAuthService;

  @httpPost('/local')
  public async authenticate(req: Request, res: Response): Promise<UserDTO | null> {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new HTTP400Error('Username or password was not given');
    } else {
      const user = await this.authService.login({
        email,
        password,
      });

      if (!user) {
        throw new HTTP401Error('Wrong email or password');
      } else {
        return user;
      }
    }
  }

  @httpPost('/register')
  public async register(req: Request, res: Response): Promise<UserDTO | null> {
    const { email, password, firstName, lastName, address } = req.body;
    if (!req.body.email || !req.body.password) {
      throw new HTTP400Error('Username or password was not given');
    } else {
      const user = await this.authService.register({
        email,
        password,
        firstName,
        lastName,
        address,
      });

      return user;
    }
  }
}
