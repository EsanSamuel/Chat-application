import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 0,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    profilePicture: {
      type: String,
      default: "",
    },
    createdAt: {
      type: Date,
      default: () => new Date(),
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);
export default User;
