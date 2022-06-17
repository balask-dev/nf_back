import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   username: { type: Object, required: true, unique: true },
//   email: { type: Object, required: true, unique: true },
//   password: { type: String, required: true },
//   profilePicture: { type: String, default: "" },
//   isAdmin: { type: Boolean, default: false },
// },
// {timestamps: true}

// );
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
