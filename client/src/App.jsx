import { useEffect } from 'react'
import { useState } from 'react'
import './App.css'
import TaskItem from './components/taskItem';

function App() {
  const [todos, setTodos] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:3030/jsonstore/todos')
      .then(res => res.json())
      .then(data => {
        const result = Object.values(data);
        setTodos(result);
      })
      .catch(err => console.log(err));
  }, []);

  const statusChangeHandler = (taskId) => {
      // setTodos(oldToDos => oldToDos.map(todo => todo._id === taskId ? {...todo, isCompleted: !todo.isCompleted} : todo));

      fetch(`http://localhost:3030/jsonstore/todos/${taskId}`, {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          _id: taskId,
          text: todos.find(todo => todo._id === taskId).text,
          isCompleted: !todos.find(todo => todo._id === taskId).isCompleted,})
      })
      .then(res => res.json())
      .then(data => {
        setTodos(oldToDos => oldToDos.map(todo => todo._id === taskId ? {...todo, isCompleted: !todo.isCompleted} : todo));
      })
      .catch(err => console.log(err));
  }

  const deleteTask = async (taskId) => {
    fetch(`http://localhost:3030/jsonstore/todos/${taskId}`, {
      method: 'delete',
      headers: {'Content-Type': 'application/json'},
    })
    .then(res => res.json())
    .then(data => {
      setTodos(oldToDos => oldToDos.filter(todo => todo._id !== taskId));
    })
    .catch(err => console.log(err));
  }

  const createTask = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    
    const taskData = formData.get('taskInput');
    const taskInput = document.getElementById('taskInput');

    fetch('http://localhost:3030/jsonstore/todos', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        isCompleted: false,
        text: taskData
      })
    })
    .then(res => res.json())
    .then(data => {
      taskInput.value = '';
      setTodos(oldToDos => [...oldToDos, data]);
    })
    .catch(err => console.log(err));
  }

  return (
    <>
      <div className="container">
        <h2>To-Do List</h2>
        <form className="input-container" onSubmit={createTask}>
            <input type="text" id="taskInput" name='taskInput' placeholder="Add a new task" />
            <button className='addButton' type='submit'>Add</button>
        </form>
        <ul id="taskList">  
          {todos.map(todo => 
            <TaskItem
              id={todo._id}
              key={todo._id}
              text={todo.text}
              isCompleted={todo.isCompleted}
              onStatusChange={statusChangeHandler}
              onDelete={deleteTask}
            />
          )}
        </ul> 
      </div>
    </>
  )
}

export default App
