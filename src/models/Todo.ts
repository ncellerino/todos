import { Document, Model, model, Schema } from 'mongoose';
import { IUser } from './User';

const TodoSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    completed: Boolean,
  },
  { timestamps: true },
);

/**
 * Interface to model the Todo Schema for TypeScript.
 * Do not export this.
 */
interface ITodoBase extends Document {
  title: string;
  description?: string;
  completed: boolean;
}

export interface TodoDTO {
  _id?: string;
  title: string;
  description?: string;
  completed: boolean;
}

/**
 * Interface for not populated model
 */
export interface ITodo extends ITodoBase {
  user: IUser['_id'];
}
/**
 * Interface for populated model
 */
export interface ITodoPopulated extends ITodoBase {
  user: IUser;
}

// Static methods
TodoSchema.statics.findWithUser = async function (id: string): Promise<ITodoPopulated> {
  return this.findById(id).populate('user').exec();
};

export interface ITodoModel extends Model<ITodo> {
  findWithUser(id: string): Promise<ITodoPopulated>;
}

export default model<ITodo, ITodoModel>('Todo', TodoSchema);
