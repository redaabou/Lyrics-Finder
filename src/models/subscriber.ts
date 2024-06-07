import mongoose, { Document, Schema } from "mongoose";

// Define the TypeScript interface for a Subscribers
interface ISubscriber extends Document {
  userId: String;
  email: string;
}

// Subscriber Schema
const subscriberSchema = new Schema<ISubscriber>(
  {
    userId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Subscriber = mongoose.model<ISubscriber>("Subscriber", subscriberSchema);

export { subscriberSchema, Subscriber, ISubscriber };
