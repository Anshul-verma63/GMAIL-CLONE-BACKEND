import mongoose from "mongoose";

const mailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  sms: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  image: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
  starred: {
    type: Boolean,
    required: true,
    default: false,
  },
  type: {
    type: String,
    required: true,
  },
  bin: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export default mongoose.model("email", mailSchema);
