
import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import { Entity } from "@/types/types";
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
  isLoading: true,
} as any

const todaySlice = createSlice({
  name: "today",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.counter++
      const newEntity = {
        id: nanoid(),
        ...action.payload,
      };
      state.entities.push(newEntity);
    },
    completed: (state, action) => {
      state.entities = state.entities.map((entity: Entity) => {
        if (entity.uniqueId === action.payload) {
          return { ...entity, completed: true };
        }
        return entity;
      })
    }   
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {

      state.isLoading = false
      const newEntities = action.payload.map((entity: Entity) => ({
        id: nanoid(),
        ...entity
      }));
      
      const uniqueEntities = newEntities.filter((entity: Entity) => {
        return !state.entities.some((existingEntity: Entity) => existingEntity.uniqueId === entity.uniqueId || existingEntity._id === entity._id);
      });
      
      state.entities.push(...uniqueEntities);
      state.counter = action.payload.length
    })
  }
});

export const {addTodo, completed} = todaySlice.actions
export default todaySlice.reducer