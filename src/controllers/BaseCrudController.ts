import { BaseController } from './BaseController';
import { Request, Response } from 'express';

export abstract class BaseCrudController extends BaseController {
  public abstract create(req: Request, res: Response): Promise<void>;
  public abstract getById(id: string, req: Request, res: Response): void;
  public abstract getAll(req: Request, res: Response): void;
  public abstract update(id: string, req: Request, res: Response): void;
  public abstract delete(id: string, req: Request, res: Response): void;
}
