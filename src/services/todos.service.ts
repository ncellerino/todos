import { ITodo } from "../models/Todo";
import TYPES from "../types";
import { inject, injectable } from "inversify";
import { IBaseRepository } from "../repository/interfaces/IBaseRepository";
export interface ITodoService {
  getTodos(): Promise<Array<ITodo>>;
  createTodo(data: ITodo): Promise<ITodo>;
}
@injectable()
export class TodoServiceImpl implements ITodoService {
  @inject(TYPES.TodoRepository)
  private todoRepository!: IBaseRepository<ITodo>;

  getTodos(): Promise<ITodo[]> {
    return this.todoRepository.findAll();
  }

  createTodo(data: ITodo): Promise<ITodo> {
    return this.todoRepository.create(data);
  }
}
