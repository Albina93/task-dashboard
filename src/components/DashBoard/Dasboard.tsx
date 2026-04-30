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
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-4"></div>
      <h1 className="text-2xl font-bold text-gray-800 text-center">
        Task Dashboard
      </h1>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4 text-center border border-gray-200">
          <p className="text-3xl font-bold text-blue-500">{tasks.length}</p>
          <p className="text-sm text-gray-500">Total Tasks</p>
        </div>
      </div>

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
