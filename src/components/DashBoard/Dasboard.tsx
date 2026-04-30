import { useState, useEffect } from "react";
import type { Task, TaskStatus, TaskFormData } from "../../types";
import { TaskList } from "../TaskList/TaskList";
import { TaskForm } from "../TaskForm/TaskForm";

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
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
      <TaskList
        tasks={tasks}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};
export default Dashboard;
