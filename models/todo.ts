import mongoose, {Schema, models} from "mongoose";

const userSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    }, 
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    priority: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;