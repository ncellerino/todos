import express, { Request, Response } from "express";
import {
  controller,
  httpPost,
  requestParam,
  BaseHttpController,
  HttpResponseMessage,
  StringContent
} from "inversify-express-utils";
import { TodoService } from "../services/todos.service";
import { inject } from "inversify";
import TYPES from "../types";

@controller("/todos")
export class TodoController extends BaseHttpController {
  @inject(TYPES.TodoService)
  private todoService!: TodoService;

  @httpPost("/process-sheet/:fileId")
  public async processSheet(
    @requestParam("fileId") fileId: string,
    req: Request
  ) {}
}
