import { useState } from 'react';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([
    {
      id : 0,
      label: "Test",
      completed : false
    }
  ]);
  
  const [newTodo, setNewTodo] = useState("");
  return (
    <div className="App">
      {
        tasks.map(task => 
          <div className="task">
            {task.completed ? "X" : "O"}
            {task.label}
          </div>
        )
      }
      <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)}/>
      <button type="button" onClick={() => {
        setTasks((prev => [...prev, {
          id: prev.length + 1,
          label: newTodo,
          completed: false
        }]));
        setNewTodo(() => "");
      }}>Add</button>
    </div>
  );
}

export default App;
