import { useState, useRef } from "react"
import { useAppDispatch } from "../hooks"
import { removeTodo, toggleTodo, editTodo } from "../state/todo/todoSlice"
import { FaRegTrashCan, FaPencil } from "react-icons/fa6"

type TodoProps = {
  id: number
  text: string
  completed: boolean
  completionDate: string | null
}

export default function Todo({
  id,
  text,
  completed,
  completionDate,
}: TodoProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [newTodo, setNewTodo] = useState("")
  const dispatch = useAppDispatch()

  const handleOnSave = () => {
    if (newTodo.trim() !== "") {
      dispatch(editTodo({ id, text: newTodo }))
      setIsEditing(false)
    }
  }

  const handleOnCancel = () => {
    setIsEditing(false)
    setNewTodo(text)
  }

  const handleOnEdit = () => {
    setIsEditing(true)
    setNewTodo(text)
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, 0)
  }

  const handleRemoveTodo = () => {
    dispatch(removeTodo(id))
  }

  return (
    <div className="flex justify-between items-center bg-white pl-1 pr-3 py-3 rounded-md shadow-md border relative">
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="text-lg font-semibold px-2 w-full mr-6 focus:outline-blue-500"
        />
      ) : (
        <>
          <h2
            className={`text-lg font-semibold px-2  ${
              completed ? "line-through text-green-500" : ""
            }`}
          >
            {text}
          </h2>
          {completed && completionDate && (
            <span className="text-green-600 text-sm ml-auto mr-4 mt-1">
              Completed on {completionDate}
            </span>
          )}
        </>
      )}
      <div className="flex gap-2 items-center">
        {isEditing ? (
          <>
            <button
              onClick={handleOnSave}
              className="bg-blue-600 text-white cursor-pointer px-2 py-1 rounded-md mr-1 text-sm"
            >
              Save
            </button>
            <button
              onClick={handleOnCancel}
              className="bg-red-600 text-white cursor-pointer px-2 py-1 rounded-md text-sm"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              className="text-blue-600 cursor-pointer"
              onClick={handleOnEdit}
            >
              <FaPencil className="w-5 h-5 mr-2" />
            </button>
            <button
              className="text-red-600 cursor-pointer"
              onClick={handleRemoveTodo}
            >
              <FaRegTrashCan className="w-5 h-5" />
            </button>
            <input
              type="checkbox"
              checked={completed}
              onChange={() => dispatch(toggleTodo(id))}
              className="ml-2 appearance-none w-5 h-5 border-2 border-gray-500 rounded-full bg-transparent cursor-pointer checked:bg-green-600 checked:border-green-600"
            />
          </>
        )}
      </div>
    </div>
  )
}
