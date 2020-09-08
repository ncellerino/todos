import { Container } from 'inversify';
import 'reflect-metadata';
import '../../controllers/TodoController';
import '../../controllers/UserController';
import '../../controllers/AuthController';
import '../../controllers/StaticController';
import { ITodoService, TodoServiceImpl } from '../../services/TodoService';
import { IUserService, UserServiceImpl } from '../../services/UserService';

import TYPES from '../../types';
import { ITodo } from '../../models/Todo';
import { IUser } from '../../models/User';
import { IBaseRepository } from '../../repository/interfaces/IBaseRepository';
import { TodoRepository } from '../../repository/TodoRepository';
import { UserRepository } from '../../repository/UserRepository';
import { IAuthService, AuthServiceImpl } from '../../services/AuthService';

const container = new Container();

container.bind<IBaseRepository<ITodo>>(TYPES.TodoRepository).to(TodoRepository);
container.bind<IBaseRepository<IUser>>(TYPES.UserRepository).to(UserRepository);
container.bind<ITodoService>(TYPES.TodoService).to(TodoServiceImpl);
container.bind<IUserService>(TYPES.UserService).to(UserServiceImpl);
container.bind<IAuthService>(TYPES.AuthService).to(AuthServiceImpl);

export default container;

function bindDependencies(func: any, dependencies: any) {
  const injections = dependencies.map((dependency: any) => {
    return container.get(dependency);
  });
  return func.bind(func, ...injections);
}

export { bindDependencies };
