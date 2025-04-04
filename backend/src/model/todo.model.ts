import mongoose, { Document, Schema } from "mongoose";


export interface ITodo extends Document {
  text: string;
  completed: boolean;
  user: mongoose.Types.ObjectId; 
}

const todoSchema: Schema<ITodo> = new Schema({
  text: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
});


const Todo = mongoose.model<ITodo>("Todo", todoSchema);
export default Todo;
