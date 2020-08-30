import { BaseRepositoryImpl } from './BaseRepositoryImpl';
import Todo, { ITodo } from '../models/Todo';

export class TodoRepository extends BaseRepositoryImpl<ITodo> {
  constructor() {
    super(Todo);
  }
}
