import express, { Request, Response } from "express";
import {
  controller,
  httpPost,
  requestParam,
  BaseHttpController,
  HttpResponseMessage,
  StringContent,
  httpGet
} from "inversify-express-utils";
import { TodoService } from "../services/todos.service";
import { inject } from "inversify";
import TYPES from "../types";

@controller("/todos")
export class TodoController extends BaseHttpController {
  @inject(TYPES.TodoService)
  private todoService!: TodoService;

  @httpGet("/")
  public async getTodos(req: Request) {
    return this.json(this.todoService.getTodos(), 200);
  }
}
