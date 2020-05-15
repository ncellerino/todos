import mongoose = require("mongoose");
export interface IWrite<T> {
  delete(id: string): Promise<T | null>;
  create(model: T): Promise<T>;
  update(model: T): Promise<T>;
}
