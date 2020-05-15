import { Container } from "inversify";
import "reflect-metadata";
import "../controllers/todos.controller";
import { TodoService, TodoServiceImpl } from "../services/todos.service";
import TYPES from "../types";
import Todo, { ITodo, ITodoModel } from "../models/Todo";
import { IWrite } from "../repository/interfaces/IWrite";
import { IRead } from "../repository/interfaces/IRead";
import { IBaseRepository } from "../repository/interfaces/IBaseRepository";
import { BaseRepositoryImpl } from "../repository/BaseRepositoryImpl";

const container = new Container();

container
  .bind<IBaseRepository<ITodo>>(TYPES.TodoRepository)
  .to(BaseRepositoryImpl);
container.bind<TodoService>(TYPES.TodoService).to(TodoServiceImpl);

export default container;
