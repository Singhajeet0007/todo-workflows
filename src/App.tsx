import { useState, type FormEvent } from 'react'
import { useTodos } from './useTodos'
import './App.css'

type Filter = 'all' | 'active' | 'completed'

function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, clearCompleted } = useTodos()
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState<Filter>('all')

  const filtered =
    filter === 'all'
      ? todos
      : filter === 'active'
        ? todos.filter((t) => !t.completed)
        : todos.filter((t) => t.completed)

  const activeCount = todos.filter((t) => !t.completed).length
  const completedCount = todos.length - activeCount

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    addTodo(input)
    setInput('')
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Todos</h1>
        <p className="subtitle">Stored in your browser (localStorage)</p>
      </header>

      <form className="add-form" onSubmit={handleSubmit}>
        <label htmlFor="new-todo" className="visually-hidden">
          New task
        </label>
        <input
          id="new-todo"
          className="add-input"
          type="text"
          placeholder="What needs doing?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoComplete="off"
        />
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>

      <div className="filters" role="group" aria-label="Filter tasks">
        {(['all', 'active', 'completed'] as const).map((f) => (
          <button
            key={f}
            type="button"
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <ul className="todo-list" aria-label="Task list">
        {filtered.length === 0 ? (
          <li className="empty">
            {todos.length === 0
              ? 'No tasks yet. Add one above.'
              : 'Nothing in this view.'}
          </li>
        ) : (
          filtered.map((todo) => (
            <li key={todo.id} className="todo-item">
              <label className="todo-label">
                <input
                  type="checkbox"
                  className="todo-check"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span className={todo.completed ? 'todo-text done' : 'todo-text'}>
                  {todo.text}
                </span>
              </label>
              <button
                type="button"
                className="btn-delete"
                onClick={() => deleteTodo(todo.id)}
                aria-label={`Delete: ${todo.text}`}
              >
                Remove
              </button>
            </li>
          ))
        )}
      </ul>

      {todos.length > 0 && (
        <footer className="footer">
          <span className="stats">
            {activeCount} active
            {completedCount > 0 ? ` · ${completedCount} done` : ''}
          </span>
          {completedCount > 0 && (
            <button type="button" className="btn-link" onClick={clearCompleted}>
              Clear completed
            </button>
          )}
        </footer>
      )}
    </div>
  )
}

export default App
