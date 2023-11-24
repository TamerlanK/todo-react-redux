import Todo from "./Todo"
import { useAppSelector } from "../hooks"
import { highlightSearchTerm } from "../utils"
import { Todo as TodoType } from "../types"

type TodosListProps = {
  sortingCriteria: string
}

export default function TodosList({ sortingCriteria }: TodosListProps) {
  const { todos } = useAppSelector((state) => state.todo)
  const { searchTerm } = useAppSelector((state) => state.search)

  const sortTodos = (todos: TodoType[], criteria: string) => {
    if (criteria === "completion") {
      return todos.slice().sort((a) => (a.completed ? -1 : 1))
    } else if (criteria === "alphabet") {
      return todos.slice().sort((a, b) => a.text.localeCompare(b.text))
    } else if (criteria === "default") {
      return [...todos].reverse()
    }
  }

  console.log(todos)

  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedTodos = sortTodos(filteredTodos, sortingCriteria)

  if (todos.length === 0) {
    return (
      <p className="text-gray-300 text-2xl text-center my-4">
        Add your first todo{" "}
      </p>
    )
  }

  if (filteredTodos.length === 0) {
    return (
      <p className="text-gray-300 text-2xl text-center my-4">
        No matching todos
      </p>
    )
  }

  return (
    <section className="flex flex-col gap-1">
      {sortedTodos!.map((todo) => (
        <Todo
          key={todo.id}
          {...todo}
          text={highlightSearchTerm(todo.text, searchTerm) as string}
        />
      ))}
    </section>
  )
}
