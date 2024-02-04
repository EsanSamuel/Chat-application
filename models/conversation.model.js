import { Schema, model } from "mongoose";

const conversationSchema = new Schema(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
    createdAt: {
      type: Date,
      default: () => new Date(),
    },
  },
  { timestamps: true }
);

const Conversation = model("Conversation", conversationSchema);
export default Conversation;
