import { Request, Response } from "express";
import {
  controller,
  httpPost,
  JsonContent,
  httpGet,
  interfaces
} from "inversify-express-utils";
import { ITodoService } from "../services/todos.service";
import { inject } from "inversify";
import TYPES from "../types";
import { ITodo } from "../models/Todo";
import { BaseCrudController } from "./BaseCrudController";
import { networkInterfaces } from "os";

@controller("/todos")
export class TodoController extends BaseCrudController {
  @inject(TYPES.TodoService)
  private todoService!: ITodoService;

  public getById(req: Request, res: Response): void {
    throw new Error("Method not implemented.");
  }
  @httpPost("/")
  public async create(req: Request, res: Response): Promise<void> {
    const hero: ITodo = <ITodo>req.body;
    let todo: ITodo = await this.todoService.createTodo(hero);
    res.status(200).json(todo);
  }

  @httpGet("/")
  public async getAll(req: Request, res: Response): Promise<void> {
    let todos: ITodo[] = await this.todoService.getTodos();
    res.status(200).json(todos);
  }
  public update(req: Request, res: Response): void {
    throw new Error("Method not implemented.");
  }
  public delete(req: Request, res: Response): void {
    throw new Error("Method not implemented.");
  }
}
