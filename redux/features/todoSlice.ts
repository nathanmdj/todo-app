import { connectMongoDB } from "@/lib/mongodb";
import Todo from "@/models/todo";
import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";



type InitialState = {
  todos: TodoState;
}

type TodoState = {
  // _id: string;
  userID: string;
  taskname: string;
  description: string;
  date: Date;
  priority: number;
  location: string;
   
}


const todosFromDB = async () => {
  try {
    connectMongoDB();
    const todos = await Todo.find({});
    return todos
  } catch (error) {
    
  }
}
const initialState = {
  todos: todosFromDB() as TodoState,
} as InitialState;

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action)=>{
      const todo = {
        id: nanoid(),
        text: action.payload,
      }
      state.todos.push(todo)
    },
    // removeTodo: (state, action)=>{
    //   state.todos = state.todos.filter((todo)=>todo.id !== action.payload)
    // }
  }
});

export const {addTodo} = todoSlice.actions;

export default todoSlice.reducer;