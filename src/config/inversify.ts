import { Container } from "inversify";
import "reflect-metadata";
import "../controllers/todos.controller";

const container = new Container();

export default container;
