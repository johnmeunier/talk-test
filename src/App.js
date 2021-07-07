import { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);

  const [filteredTasks, setFilteredTasks] = useState(tasks);

  const [newTodo, setNewTodo] = useState("");

  const [filterStatus, setFilterStatus] = useState("all");

  const handleFilterStatus = e => {
    setFilterStatus(e.target.value)
  }

  const filter = ({tasks, filterStatus}) => {
    if(filterStatus === "all") return tasks;
    if(filterStatus === "completed") return tasks.filter(({completed}) => completed);
    if(filterStatus === "active") return tasks.filter(({completed}) => !completed);
  }

  useEffect(() => {
    setFilteredTasks(() => filter({tasks, filterStatus}));
  }, [filterStatus, tasks]);

  useEffect(() => {
    setFilteredTasks(filter({tasks, filterStatus}));
  }, [tasks])
  
  return (
    <div className="App">
      <div className="filter__container">
        <div className="filter">
          {
            ["completed", "active", "all"].map(value => (
              <label key={value}>
              {value}
              <input type="radio" name="status" value={value} checked={value === filterStatus} onChange={handleFilterStatus}/> 
            </label>
            ))
          }
        </div>
      </div>
      <div className="task__container">
        <ul>{
        filteredTasks.map((task, i) => 
          <li className="task" key={task.id} onClick={() => {
            setTasks(prev => {
              const newTasks = [...JSON.parse(JSON.stringify(prev))];
              console.log(newTasks);
              newTasks[i].completed = !newTasks[i].completed;
              return newTasks
            })
          }}>
            {task.completed ? "X" : "O"}
            {task.label}
          </li>
        )
      }</ul>
      
      </div>
      <label> Add 
        <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)}/>
      </label>
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
