import { useAppDispatch } from "../hooks"
import { removeChecked } from "../state/todo/todoSlice"

type RemoveCompletedTodosButtonProps = {
  hasCompletedTodos: boolean
}

export default function RemoveCompletedTodosButton({
  hasCompletedTodos,
}: RemoveCompletedTodosButtonProps) {
  const dispatch = useAppDispatch()
  return (
    <button
      onClick={() => dispatch(removeChecked())}
      className="bg-green-300 text-green-600 rounded-md p-2 mt-4 disabled:bg-gray-300 disabled:text-gray-600"
      disabled={!hasCompletedTodos}
      title={!hasCompletedTodos ? "You don't have any completed todo" : ""}
    >
      Remove all completed todos ✔️
    </button>
  )
}
