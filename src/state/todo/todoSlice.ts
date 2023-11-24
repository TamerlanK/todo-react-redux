import { createSlice } from "@reduxjs/toolkit"

type Todo = {
  id: number
  text: string
  completed: boolean
  completionDate: string | null
}

interface TodoState {
  todos: Todo[]
  lastRemovedTodo: Todo | null
  isUndoing: boolean
}

const initialState: TodoState = {
  todos: [],
  lastRemovedTodo: null,
  isUndoing: false

}

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload)
    },
    toggleTodo: (state, action) => {
      const todoToToggle = state.todos.find(
        (todo) => todo.id === action.payload
      )
      if (todoToToggle) {
        todoToToggle.completed = !todoToToggle.completed
        if (todoToToggle.completed) {
          const currentDate = new Date()
          const formattedDate = currentDate.toLocaleString(undefined, {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false
          })
          todoToToggle.completionDate = formattedDate
        } else {
          todoToToggle.completionDate = null
        }
      }
    },
    removeTodo: (state, action) => {
      const todoToRemove = action.payload
      state.todos = state.todos.filter((todo) => todo.id !== todoToRemove)
    },
    removeChecked: (state) => {
      state.todos = state.todos.filter((todo) => !todo.completed)
    },
    editTodo: (state, action) => {
      const todoToEdit = state.todos.find(
        (todo) => todo.id === action.payload.id
      )
      if (todoToEdit) {
        todoToEdit.text = action.payload.text
      }
    },
  },
})

export const { addTodo, toggleTodo, removeTodo, removeChecked, editTodo } =
  todoSlice.actions
export default todoSlice.reducer
