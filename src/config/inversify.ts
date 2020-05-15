import { Container } from "inversify";
import "reflect-metadata";
import "../controllers/todos.controller";
import { TodoService, TodoServiceImpl } from "../services/todos.service";
import TYPES from "../types";
import Todo, { ITodo, ITodoModel } from "../models/Todo";
import { IBaseRepository } from "../repository/interfaces/IBaseRepository";
import { TodoRepository } from "../repository/TodoRepository";

const container = new Container();

container.bind<ITodo>(TYPES.Todo).to(Todo);
container.bind<IBaseRepository<ITodo>>(TYPES.TodoRepository).to(TodoRepository);
container.bind<TodoService>(TYPES.TodoService).to(TodoServiceImpl);

export default container;
