import { ITodo } from "../models/Todo";
import TYPES from "../types";
import { inject, injectable } from "inversify";
import { IBaseRepository } from "../repository/interfaces/IBaseRepository";
export interface TodoService {
  getTodos(): Promise<Array<ITodo>>;
}
@injectable()
export class TodoServiceImpl implements TodoService {
  @inject(TYPES.TodoRepository)
  private todoRepository!: IBaseRepository<ITodo>;

  getTodos(): Promise<ITodo[]> {
    return this.todoRepository.findAll();
  }
}
