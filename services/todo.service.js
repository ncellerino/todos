import Service from "./service";
import Todo from "../models/todo.model";

class TodoService extends Service {
  constructor() {
    super(new Todo().getInstance());
  }
}

export default TodoService;
