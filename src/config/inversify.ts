import { Container } from "inversify";
import "reflect-metadata";
import "../controllers/TodoController";
import { ITodoService, TodoServiceImpl } from "../services/todos.service";
import TYPES from "../types";
import Todo, { ITodo, ITodoModel } from "../models/Todo";
import { IBaseRepository } from "../repository/interfaces/IBaseRepository";
import { TodoRepository } from "../repository/TodoRepository";

const container = new Container();

container.bind<IBaseRepository<ITodo>>(TYPES.TodoRepository).to(TodoRepository);
container.bind<ITodoService>(TYPES.TodoService).to(TodoServiceImpl);

export default container;
