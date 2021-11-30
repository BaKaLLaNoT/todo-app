import React, { Fragment, useState } from 'react'

type FormElement = React.FormEvent<HTMLFormElement>
type Element = React.ReactElement<any>

interface ITask {
  name: string;
  done: boolean;
}

function App () : Element {
  const [newTask, setNewTask] = useState<string>('')
  const [tasks, setTasks] = useState<ITask[]>([])

  const addTask = (name: string): void => {
    const newTasks: ITask[] = [...tasks, { name, done: false }]
    setTasks(newTasks)
  }

  const handleSubmit = (event : FormElement):void => {
    event.preventDefault()
    addTask(newTask)
    setNewTask('')
  }

  const toggleDoneTask = (index: number): void => {
    const newTasks: ITask[] = [...tasks]
    newTasks[index].done = !newTasks[index].done
    setTasks(newTasks)
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
      {tasks.map((task: ITask, index: number) => (
        <div key={index}>
        <button onClick={() => { toggleDoneTask(index) }} >
          <h2 style={{ textDecoration: task.done ? 'line-through' : '' }}>
            {task.name}
          </h2>
          </button>
        </div>
      ))}
    </Fragment>
  )
}

export default App
