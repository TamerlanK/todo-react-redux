import { useState } from "react"
import { AiOutlinePlus } from "react-icons/ai"
import { useAppDispatch } from "../hooks"
import { addTodo } from "../state/todo/todoSlice"

export default function TodoForm() {
  const [newTodo, setNewTodo] = useState("")
  const [error, setError] = useState("")
  const dispatch = useAppDispatch()

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      const todo = {
        id: Date.now(),
        text: newTodo,
        completed: false,
      }
      dispatch(addTodo(todo))
      setNewTodo("")
      setError("")
    } else {
      setError("Enter a todo text")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleAddTodo()
  }
  return (
    <>
      <form className="flex justify gap-2 my-4 w-full">
        <input
          type="text"
          className="bg-gray-100 py-1 pl-2 outline-none text-xl rounded-md w-full"
          placeholder="New todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="flex justify-center items-center rounded-md p-4 bg-gray-100 text-sky-600 text-xl aspect-square"
        >
          <AiOutlinePlus />
        </button>
      </form>
      {error && (
        <p className="px-2 py-1 mb-2 -mt-1 bg-red-300 text-red-600 rounded-md">
          {error}
        </p>
      )}
    </>
  )
}
