import { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [newTodo, setNewTodo] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterLabel, setFilterLabel] = useState("");
  const [sortStatus, setSortStatus] = useState("");

  const filter = ({ tasks, filterStatus, filterLabel }) => {
    let filteredTasks = [...tasks];
    if (filterStatus === "completed")
      filteredTasks = filteredTasks.filter(({ completed }) => completed);
    if (filterStatus === "active")
      filteredTasks = filteredTasks.filter(({ completed }) => !completed);
    if (filterLabel !== "") {
      filteredTasks = filteredTasks.filter(({ label }) =>
        label.toLowerCase().includes(filterLabel.toLowerCase())
      );
    }
    return filteredTasks;
  };

  const sort = ({ filteredTasks, sortStatus }) => {
    let sortedTasks = [...filteredTasks];
    if (sortStatus !== "") {
      sortedTasks.sort((a, b) =>
        sortStatus === "active"
          ? a.completed - b.completed
          : b.completed - a.completed
      );
    }
    return sortedTasks;
  };

  useEffect(() => {
    setFilteredTasks(() =>
      sort({
        filteredTasks: filter({ tasks, filterStatus, filterLabel }),
        sortStatus,
      })
    );
  }, [filterStatus, filterLabel, sortStatus, tasks]);

  useEffect(() => {
    setFilteredTasks(filter({ tasks, filterStatus, filterLabel }));
  }, [tasks]);

  return (
    <div className="App">
      <div className="container">
        <h1>Todo app for presentation</h1>
        <div className="filter__container">
          <div className="filter">
            <h2>Filter</h2>
            <div className="input-container">
              <label>
                by label :{" "}
                <input
                  type="text"
                  className="input"
                  value={filterLabel}
                  onChange={(e) => setFilterLabel(e.target.value)}
                />
              </label>
            </div>
            <div className="input-container">
              <label>
                Status
                <select
                  onChange={(e) => setFilterStatus(e.target.value)}
                  data-testid="filterByStatus"
                >
                  <option value="all">All</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </select>
              </label>
            </div>
          </div>
        </div>
        <div className="sort__container">
          <div className="sort">
            <h2>Sort</h2>
            <label>
              Status
              <select onChange={(e) => setSortStatus(e.target.value)}>
                <option value="">Default</option>
                <option value="active">Active items first</option>
                <option value="completed">Completed items first</option>
              </select>
            </label>
          </div>
        </div>
        <div className="task__container">
          <ul>
            {filteredTasks.map((task, i) => (
              <li
                className={`task ${
                  task.completed ? "task--completed" : "task"
                }`}
                key={task.id}
                onClick={() => {
                  setTasks((prev) => {
                    const newTasks = [...JSON.parse(JSON.stringify(prev))];
                    newTasks.forEach((newTask, index) => {
                      if (newTask.id === task.id) {
                        newTasks[index].completed = !newTasks[index].completed;
                      }
                    });
                    return newTasks;
                  });
                }}
              >
                <span className="task-label">{task.label}</span>

                <span
                  className={
                    "status-icon " +
                    (task.completed ? "status-icon--completed" : "")
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 96 96"
                    role="img"
                  >
                    <title>{task.completed ? "Completed" : "Active"}</title>
                    {/* <path d="M1 1v94h94V1H1zM91.1 91.1H4.9V4.9h86.1V91.1z" /> */}
                    <path
                      className="completed-check"
                      fill="none"
                      d="m 22.939024,46.886041 18.480655,18.0492 31.424305,-33.078215 v 0"
                    />
                  </svg>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <form
          onSubmit={(e) => {
            setTasks((prev) => [
              ...prev,
              {
                id: prev.length + 1,
                label: newTodo,
                completed: false,
              },
            ]);
            setNewTodo(() => "");
            e.preventDefault();
          }}
        >
          <label>
            <h2>Add</h2>
            <input
              className="input input--emphasis"
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
          </label>
          <button type="submit">+</button>
        </form>
      </div>
    </div>
  );
};

export default App;
