import mongoose, {Schema, models} from "mongoose";

const todoSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    }, 
    taskname: {
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
    uniqueId: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
      default: false
    }
    
  },
  { timestamps: true }
);

const Todo = models.Todo || mongoose.model("Todo", todoSchema);
export default Todo;