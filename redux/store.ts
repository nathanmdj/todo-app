import {configureStore} from '@reduxjs/toolkit';
import todayReducer from './features/todaySlice';

const store = configureStore({
  reducer: {
    today: todayReducer
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
// selectors
