import { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([
    {
      id : 0,
      label: "Test",
      completed : false
    }
  ]);

  const [filteredTasks, setFilteredTasks] = useState(tasks);

  const [newTodo, setNewTodo] = useState("");

  const [filterStatus, setFilterStatus] = useState("all");

  const handleFilterStatus = e => {
    setFilterStatus(e.target.value)
  }

  useEffect(() => {
    setFilteredTasks(() => {
      if(filterStatus === "all") return tasks;
      if(filterStatus === "onlyCompleted") return tasks.filter(({completed}) => completed);
      if(filterStatus === "onlyActive") return tasks.filter(({completed}) => !completed);
    })
  }, [filterStatus, tasks]);

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks])
  
  return (
    <div className="App">
      <div className="filter__container">
        <div className="filter">
          <label>
            Completed
            <input type="radio" name="status" value="onlyCompleted" onChange={handleFilterStatus}/> 
          </label>
          <label>
            Active
            <input type="radio" name="status" value="onlyActive" onChange={handleFilterStatus}/> 
          </label>
          <label>
            All
            <input type="radio" name="status" value="all" onChange={handleFilterStatus}/> 
          </label>
        </div>
      </div>
      <div className="task__container">
      {
        filteredTasks.map((task, i) => 
          <div className="task" onClick={() => {
            setTasks(prev => {
              const newTasks = [...JSON.parse(JSON.stringify(prev))];
              console.log(newTasks);
              newTasks[i].completed = !newTasks[i].completed;
              return newTasks
            })
          }}>
            {task.completed ? "X" : "O"}
            {task.label}
          </div>
        )
      }
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
