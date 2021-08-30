import { useState, useEffect } from "react";
import "./App.css";

export const toggleStatus = (setTasks) => (i) => {
  setTasks((prev) => {
    const newTasks = [...JSON.parse(JSON.stringify(prev))];
    newTasks[i].completed = !newTasks[i].completed;
    return newTasks;
  });
};

export const handleAddTask = (setTasks, setNewTodo) => (newTodo) => {
  setTasks((prev) => [
    ...prev,
    {
      id: prev.length + 1,
      label: newTodo,
      completed: false,
    },
  ]);
  setNewTodo(() => "");
};

export const filter = ({ tasks, filterStatus }) => {
  if (filterStatus === "all") return tasks;
  if (filterStatus === "completed")
    return tasks.filter(({ completed }) => completed);
  if (filterStatus === "active")
    return tasks.filter(({ completed }) => !completed);
};

export const handleFilterStatus = (setFilterStatus) => (e) => {
  setFilterStatus(e.target.value);
};

const Container = () => {
  const [tasks, setTasks] = useState([]);

  const [filteredTasks, setFilteredTasks] = useState(tasks);

  const [newTodo, setNewTodo] = useState("");

  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    setFilteredTasks(() => filter({ tasks, filterStatus }));
  }, [filterStatus, tasks]);

  return (
    <View
      filterStatus={filterStatus}
      handleFilterStatus={handleFilterStatus(setFilterStatus)}
      filteredTasks={filteredTasks}
      newTodo={newTodo}
      setNewTodo={setNewTodo}
      toggleStatus={toggleStatus(setTasks)}
      handleAddTask={handleAddTask(setTasks, setNewTodo)}
    />
  );
};

export const View = ({
  toggleStatus,
  filterStatus,
  handleFilterStatus,
  filteredTasks,
  newTodo,
  setNewTodo,
  handleAddTask,
}) => (
  <div className="App">
    <div className="filter__container">
      <div className="filter">
        {["completed", "active", "all"].map((value) => (
          <label key={value}>
            {value}
            <input
              type="radio"
              name="status"
              value={value}
              checked={value === filterStatus}
              onChange={handleFilterStatus}
            />
          </label>
        ))}
      </div>
    </div>
    <div className="task__container">
      <ul>
        {filteredTasks.map((task, i) => (
          <li
            className="task"
            key={task.id}
            onClick={() => {
              toggleStatus(i);
            }}
          >
            {task.label}{" "}
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
                <path d="M1 1v94h94V1H1zM91.1 91.1H4.9V4.9h86.1V91.1z" />
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
    <label>
      Add
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
    </label>
    <button
      type="button"
      onClick={() => {
        handleAddTask(newTodo);
      }}
    >
      Add
    </button>
  </div>
);

export default Container;
