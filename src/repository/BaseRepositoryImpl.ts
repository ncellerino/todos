import { IRead } from "./interfaces/IRead";
import { IWrite } from "./interfaces/IWrite";
import mongoose, { FilterQuery } from "mongoose";
import { injectable } from "inversify";
import { IBaseRepository } from "./interfaces/IBaseRepository";

@injectable()
export class BaseRepositoryImpl<T extends mongoose.Document>
  implements IBaseRepository<T> {
  private model: mongoose.Model<T>;

  constructor(model: mongoose.Model<T>) {
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

  update(model: T): Promise<T> {
    return this.model.updateOne(model._id, model).exec();
  }
  findAll(): Promise<T[]> {
    return this.model.find({}).exec();
  }

  private toObjectId(_id: string): mongoose.Types.ObjectId {
    return mongoose.Types.ObjectId.createFromHexString(_id);
  }
}
