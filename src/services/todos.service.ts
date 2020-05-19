import { ITodo } from "../models/Todo";
import TYPES from "../types";
import { inject, injectable } from "inversify";
import { IBaseRepository } from "../repository/interfaces/IBaseRepository";
export interface ITodoService {
  getTodos(): Promise<Array<ITodo>>;
  createTodo(data: ITodo): Promise<ITodo>;
  getById(id: string): Promise<ITodo | null>;
  update(id: string, data: ITodo): Promise<ITodo | null>;
  delete(id: string): Promise<ITodo | null>;
}
@injectable()
export class TodoServiceImpl implements ITodoService {
  @inject(TYPES.TodoRepository)
  private todoRepository!: IBaseRepository<ITodo>;

  getById(id: string): Promise<ITodo | null> {
    return this.todoRepository.findById(id);
  }

  getTodos(): Promise<ITodo[]> {
    return this.todoRepository.findAll();
  }

  createTodo(data: ITodo): Promise<ITodo> {
    return this.todoRepository.create(data);
  }

  update(id: string, data: ITodo): Promise<ITodo | null> {
    return this.todoRepository.update(id, data);
  }

  delete(id: string): Promise<ITodo | null> {
    return this.todoRepository.delete(id);
  }
}
