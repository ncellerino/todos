import Controller from "./controller";
import TodoService from "../services/todo.service";
class TodoController extends Controller {
  constructor(service) {
    super(service);
  }
}

export default new TodoController(TodoService);
