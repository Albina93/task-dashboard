import { useState, useEffect } from "react";
import type {
  Task,
  TaskStatus,
  TaskFormData,
  TaskFilterOptions,
} from "../../types";
import { TaskList } from "../TaskList/TaskList";
import { TaskForm } from "../TaskForm/TaskForm";
import { TaskFilter } from "../TaskFilter/TaskFilter";

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [filters, setFilters] = useState<TaskFilterOptions>({
    status: "all",
    priority: "all",
    searchText: "",
  });

  const filteredTasks = tasks.filter((task) => {
    const matchesTheStatus =
      filters.status === "all" || task.status === filters.status;
    const matchesThePriority =
      filters.priority === "all" || task.priority === filters.priority;
    const matchesTheSearch = task.title
      .toLowerCase()
      .includes(filters.searchText.toLocaleLowerCase());
    return matchesTheStatus && matchesThePriority && matchesTheSearch;
  });

  // Save tasks to localStorage every time tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]); // <- runs every time tasks array changes

  // just to test TaskForm renders
  const handleSubmit = (formData: TaskFormData) => {
    // console.log("Form submitted:", formData);
    const newTask: Task = {
      id: Date.now().toString(), // converts timestamp to string
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      dueDate: formData.dueDate,
      status: "todo",
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const handleStatusChange = (id: string, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task,
      ),
    );
  };
  const handleDelete = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    // console.log(id);
  };
  const handleEdit = (task: Task) => {
    console.log("edit task: ", task);
  };
  return (
    <div>
      <h1>Task Dashboard</h1>
      <p>Total tasks: {tasks.length}</p>
      <TaskForm onSubmit={handleSubmit} />
      <TaskFilter filters={filters} onFilterChange={setFilters} />
      <TaskList
        tasks={filteredTasks}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};
export default Dashboard;
