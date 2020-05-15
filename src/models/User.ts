import { Schema, Document, model } from "mongoose";
// Schema
const UserSchema: Schema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: false
  },
  email: {
    type: String,
    lowercase: true,
    required: [true, "User email required"],
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

/**
 * Interface to model the User Schema for TypeScript.
 * Do not export this.
 */
interface IUserSchema extends Document {
  firstName: string;
  lastName: string;
  address?: string;
  email: string;
  password: string;
}

// Virtuals
UserSchema.virtual("fullName").get(function(this: {
  firstName: string;
  lastName: string;
}) {
  return this.firstName + this.lastName;
});

export interface IUser extends IUserSchema {
  fullName: string;
}

// Default export
export default model<IUser>("User", UserSchema);
