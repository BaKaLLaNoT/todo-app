import React, { Fragment, useState } from 'react'
interface ITask {
  name: string;
  complete: boolean;
}

function App () : React.ReactElement<any> {
  const [newTask, setNewTask] = useState<string>('')
  const [tasks, setTasks] = useState<ITask[]>([])
  const [newFilter, setNewFilter] = useState<string>('')

  const addTask = (name: string): void => {
    const newTasks: ITask[] = [...tasks, { name, complete: false }]
    setTasks(newTasks)
  }

  const handleSubmit = (event : React.FormEvent<HTMLFormElement>):void => {
    event.preventDefault()
    if (newTask) {
      addTask(newTask)
      setNewTask('')
    }
  }

  const toggleDoneTask = (index: number): void => {
    const newTasks: ITask[] = [...tasks]
    newTasks[index].complete = !newTasks[index].complete
    setTasks(newTasks)
  }

  const setFilter = (task:ITask) => {
    return (newFilter === 'C' || newFilter === 'A') ? task.complete === (newFilter === 'C') : true
  }

  return (
    <Fragment>
       <form onSubmit={handleSubmit}>
         <h1>PaperTodo</h1>
        <input
          type="text"
          onChange={(event) => setNewTask(event.target.value)}
          value={newTask}
          autoFocus
        />
        <button>Add</button>
      </form>
      {tasks
        .filter(task => setFilter(task))
        .map((task: ITask, index: number) => (
        <div key={index}>
        <button onClick={() => { toggleDoneTask(index) }} >
          <h2 style={{ textDecoration: task.complete ? 'line-through' : '' }}>
            {task.name}
          </h2>
          </button>
        </div>
        ))}
      <div>
        Show:
        <select onChange={(event) => setNewFilter(event.target.value)} value={newFilter}>
          <option value="N">All</option>
          <option value="A">Active</option>
          <option value="C">Completed</option>
        </select>
      </div>
    </Fragment>
  )
}

export default App
