
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async (id:string, thunkApi) => {
  // const session = await getServerSession(authOptions)
  const headers = id ? { Authorization: id } : {};
  const response = await axios.get("http://localhost:3000/api/todo/today", {headers});
  const data = await response.data;
  return data;
})

const initialState = {
  entities: [],
  counter: 0,
} as any

const todaySlice = createSlice({
  name: "today",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.counter++
      state.entities.push(action.payload)
    },
   
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.entities.push(...action.payload)
      state.counter = action.payload.length
    })
  }
});

export const {addTodo} = todaySlice.actions
export default todaySlice.reducer