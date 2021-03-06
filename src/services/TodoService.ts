import Todo, { ITodo, TodoDTO } from '../models/Todo';
import TYPES from '../types';
import { inject, injectable } from 'inversify';
import { IBaseRepository } from '../repository/interfaces/IBaseRepository';
export interface ITodoService {
  getTodos(): Promise<TodoDTO[]>;
  create(data: TodoDTO): Promise<TodoDTO>;
  getById(id: string): Promise<TodoDTO | null>;
  update(id: string, data: TodoDTO): Promise<TodoDTO | null>;
  delete(id: string): Promise<TodoDTO | null>;
}
@injectable()
export class TodoServiceImpl implements ITodoService {
  @inject(TYPES.TodoRepository)
  private todoRepository!: IBaseRepository<ITodo>;

  async getById(id: string): Promise<TodoDTO | null> {
    const todo: ITodo | null = await this.todoRepository.findById(id);
    return this.toDTO(todo);
  }

  async getTodos(): Promise<TodoDTO[]> {
    const todos: ITodo[] = await this.todoRepository.findAll();
    const dtos: TodoDTO[] = [];
    todos.forEach((todo) => {
      const dto = this.toDTO(todo);
      if (dto) {
        dtos.push();
      }
    });
    return dtos;
  }

  create(data: TodoDTO): Promise<TodoDTO> {
    return this.todoRepository.create(this.toModel(data));
  }

  update(id: string, data: TodoDTO): Promise<TodoDTO | null> {
    data._id = id;
    return this.todoRepository.update(id, this.toModel(data));
  }

  delete(id: string): Promise<TodoDTO | null> {
    return this.todoRepository.delete(id);
  }

  private toDTO(todo: ITodo | null): TodoDTO | null {
    let dto: TodoDTO | null = null;
    if (todo) {
      dto = {
        _id: todo!._id,
        title: todo!.title,
        description: todo!.description,
        completed: todo!.completed,
      };
    }
    return dto;
  }

  private toModel(dto: TodoDTO): ITodo {
    return new Todo({
      _id: dto._id,
      title: dto.title,
      description: dto.description,
      completed: dto.completed,
    });
  }
}
