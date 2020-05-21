import { Container } from "inversify";
import "reflect-metadata";
import "../controllers/TodoController";
import { ITodoService, TodoServiceImpl } from "../services/todos.service";
import TYPES from "../types";
import { ITodo } from "../models/Todo";
import { IUser } from "../models/User";
import { IBaseRepository } from "../repository/interfaces/IBaseRepository";
import { TodoRepository } from "../repository/TodoRepository";
import { UserRepository } from "../repository/UserRepository";

const container = new Container();

container.bind<IBaseRepository<ITodo>>(TYPES.TodoRepository).to(TodoRepository);
container.bind<IBaseRepository<IUser>>(TYPES.TodoRepository).to(UserRepository);
container.bind<ITodoService>(TYPES.TodoService).to(TodoServiceImpl);

export default container;
