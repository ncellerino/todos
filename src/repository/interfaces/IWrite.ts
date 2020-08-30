import mongoose = require('mongoose');
export interface IWrite<T> {
  delete(id: string): Promise<T | null>;
  create(model: T): Promise<T>;
  update(id: string, model: T): Promise<T | null>;
}
