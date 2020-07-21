import { Schema, Document, model, PassportLocalSchema } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

// Schema
const UserSchema: Schema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    lowercase: true,
    required: [true, "User email required"],
    unique: true,
  },
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
  saltedPassword: string;
}

export interface UserDTO {
  _id?: string;
  firstName: string;
  lastName: string;
  address?: string;
  email: string;
  token?: string;
}

export interface UserCredentialsDTO {
  password: string;
  email: string;
}

export interface UserAuthDTO extends UserDTO {
  password: string;
}

// Virtuals
UserSchema.virtual("fullName").get(function (this: {
  firstName: string;
  lastName: string;
}) {
  return this.firstName + this.lastName;
});

export interface IUser extends IUserSchema {
  fullName: string;
}

UserSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
  usernameQueryFields: ["email"],
});

// Default export
export default model<IUser>("User", UserSchema as PassportLocalSchema);
