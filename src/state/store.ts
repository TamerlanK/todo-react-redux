import { configureStore } from "@reduxjs/toolkit"
import todoReducer from "./todo/todoSlice"
import searchReducer from './search/searchSlice'

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    search: searchReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
