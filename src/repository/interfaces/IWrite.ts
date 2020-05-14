export interface IWrite<T> {
  delete(id: string): Promise<boolean>;
  create(model: T): Promise<T>;
  update(model: T): Promise<T>;
}
