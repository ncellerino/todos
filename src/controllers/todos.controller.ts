import { Request } from "express";
import {
  controller,
  httpPost,
  BaseHttpController,
  httpGet
} from "inversify-express-utils";
import { ITodoService } from "../services/todos.service";
import { inject } from "inversify";
import TYPES from "../types";
import { ITodo } from "../models/Todo";

@controller("/todos")
export class TodoController extends BaseHttpController {
  @inject(TYPES.TodoService)
  private todoService!: ITodoService;

  @httpGet("/")
  public async getTodos(req: Request) {
    let todos: ITodo[] = await this.todoService.getTodos();
    return this.json(todos);
  }

  @httpPost("/")
  public async addTodo(req: Request) {
    var hero: ITodo = <ITodo>req.body;
    let todo: ITodo = await this.todoService.createTodo(hero);
    return this.json(todo);
  }
}
