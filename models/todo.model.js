import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

class Todo {
  initSchema() {
    const schema = new Schema(
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
    schema.plugin(uniqueValidator);
    mongoose.model("todos", schema);
  }

  getInstance() {
    this.initSchema();
    return mongoose.model("todos");
  }
}

export default Todo;
