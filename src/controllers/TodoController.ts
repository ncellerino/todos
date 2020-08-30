import { Request, Response } from 'express';
import { controller, httpPost, requestParam, httpGet, httpDelete, httpPatch } from 'inversify-express-utils';
import { ITodoService } from '../services/TodoService';
import { inject } from 'inversify';
import TYPES from '../types';
import { TodoDTO } from '../models/Todo';
import { BaseCrudController } from './BaseCrudController';
import { HTTP404Error } from '../utils/httpErrors/Http404Error';

@controller('/api/todos')
export class TodoController extends BaseCrudController {
  @inject(TYPES.TodoService)
  private todoService!: ITodoService;

  @httpGet('/:id')
  public async getById(@requestParam('id') id: string, req: Request, res: Response): Promise<void> {
    const todo: TodoDTO | null = await this.todoService.getById(id);
    if (todo) {
      res.status(200).json(todo);
    } else {
      throw new HTTP404Error('Todo not found');
    }
  }
  @httpPost('/')
  public async create(req: Request, res: Response): Promise<void> {
    const todo: TodoDTO = await this.todoService.create(req.body as TodoDTO);
    res.status(201).json(todo);
  }

  @httpGet('/')
  public async getAll(req: Request, res: Response): Promise<void> {
    const todos: TodoDTO[] = await this.todoService.getTodos();
    res.status(200).json(todos);
  }

  @httpPatch('/:id')
  public async update(@requestParam('id') id: string, req: Request, res: Response): Promise<void> {
    const todo: TodoDTO | null = await this.todoService.update(id, req.body as TodoDTO);
    if (todo) {
      res.status(200).json(todo);
    } else {
      res.status(404).send();
    }
  }

  @httpDelete('/:id')
  public async delete(@requestParam('id') id: string, req: Request, res: Response): Promise<void> {
    const todo: TodoDTO | null = await this.todoService.delete(id);
    if (todo) {
      res.status(204).send();
    } else {
      res.status(404).send();
    }
  }
}
