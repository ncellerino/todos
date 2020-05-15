export interface IRead<T> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
}
