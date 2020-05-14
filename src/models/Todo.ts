import { Document, Model, model, Schema } from "mongoose";

/**
 * Interface to model the Todo Schema for TypeScript.
 * @param title:string
 * @param completed:boolean
 */
export interface ITodo extends Document {
  title: string;
  completed: boolean;
}

const todoSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    completed: Boolean
  },
  { timestamps: true }
);

const Todo: Model<ITodo> = model("Todo", todoSchema);
export default Todo;
