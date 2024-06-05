import mongoose, { Document, Schema } from "mongoose";

// Define the TypeScript interface for a User
interface IUser extends Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

// utilisateur
const userSchema = new Schema<IUser>(
  {
    firstname: {
      type: String,
      required: [true, "Please provide your first name."],
    },
    lastname: {
      type: String,
      required: [true, "Please provide your last name."],
    },
    email: {
      type: String,
      required: [true, "Email address is required."],
      unique: true,
      validate: {
        validator: function (v: string) {
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
        },
        message: (props: { value: string }) =>
          `${props.value} is not a valid email address. Please enter a valid email.`,
      },
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      minlength: [8, "Password must be at least 8 characters long."],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);

export { userSchema, User, IUser };
