import { mongooses as mongoose, Schema } from "./momgoose"
const Schema_User = new Schema(
  {
    user: { type: String, required: true },
    name: String,
    passwd: String,
    tel: Number,
    mail: String,
    DateTime: { type: Date, default: new Date() },
    stat: { type: Boolean, default: false },
    Group: { type: String, default: "user" },
    IP: String
  },
  { timestamps: true }
);

export const User = mongoose.model("User", Schema_User);
