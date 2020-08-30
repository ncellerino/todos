import mongoose from 'mongoose';
import { injectable, unmanaged } from 'inversify';
import { IBaseRepository } from './interfaces/IBaseRepository';

@injectable()
export class BaseRepositoryImpl<T extends mongoose.Document> implements IBaseRepository<T> {
  protected model: mongoose.Model<T>;

  constructor(@unmanaged() model: mongoose.Model<T>) {
    this.model = model;
  }

  create(item: T): Promise<T> {
    return this.model.create(item);
  }

  findById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  delete(id: string): Promise<T | null> {
    return this.model.findByIdAndRemove(id).exec();
  }

  update(id: string | any, model: T): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, model, { new: true }).exec();
  }

  findAll(): Promise<T[]> {
    return this.model.find({}).exec();
  }

  private toObjectId(_id: string): mongoose.Types.ObjectId {
    return mongoose.Types.ObjectId.createFromHexString(_id);
  }
}
