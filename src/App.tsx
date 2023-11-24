import { useState } from "react"
import TodosList from "./components/TodosList"
import { useAppDispatch, useAppSelector } from "./hooks"
import TodoForm from "./components/TodoForm"
import RemoveCompletedTodosButton from "./components/RemoveCompletedTodosButton"
import { AiOutlineSearch } from "react-icons/ai"
import { setSearchTerm } from "./state/search/searchSlice"


export default function App() {
  const { todos } = useAppSelector((state) => state.todo)
  const { searchTerm } = useAppSelector((state) => state.search)
  const hasCompletedTodos = todos.some((todo) => todo.completed)
  const [sortingCriteria, setSortingCriteria] = useState("default")
  const dispatch = useAppDispatch()

  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  )
  const handleSortingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortingCriteria(event.target.value)
    console.log(event.target.value)
  }

  return (
    <main className="h-screen flex justify-center items-center bg-gradient-to-tr from-emerald-700 to-sky-600 relative">
      <div className="flex flex-col bg-white/20 rounded-lg shadow-xl p-6 w-5/6 md:w-3/5">
        <div className="flex justify-between items-center gap-2">
          <div className="relative">
            <input
              type="text"
              className="px-2 py-1 pr-8 rounded-md outline-none"
              placeholder="Search todo"
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            />
            <AiOutlineSearch
              className="absolute top-1/2 right-2 transform -translate-y-1/2"
              size={20}
            />
          </div>
          {/* ADD HERE */}
          <div>
            <select
              value={sortingCriteria}
              onChange={handleSortingChange}
              className="text-sm rounded-md p-1 text-gray-500"
            >
              <option value="default">Date Added</option>
              <option value="alphabet">Alphabetically</option>
              <option value="completion">Completion</option>
            </select>
          </div>
        </div>

        <TodoForm />
        <TodosList sortingCriteria={sortingCriteria} />
        {filteredTodos.length > 0 && (
          <RemoveCompletedTodosButton hasCompletedTodos={hasCompletedTodos} />
        )}
      </div>
    </main>
  )
}
