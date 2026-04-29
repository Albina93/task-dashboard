import { useState } from "react";
import type { Task, TaskStatus, TaskFormData } from "../../types";
import { TaskList } from "../TaskList/TaskList";
import { TaskForm } from "../TaskForm/TaskForm";
const testTasks: Task[] = [
  {
    id: "1",
    title: "test 1",
    description: "Just a test",
    status: "done",
    priority: "low",
    dueDate: "2026-01-01",
  },
  {
    id: "2",
    title: "test 2",
    description: "Just a test",
    status: "todo",
    priority: "high",
    dueDate: "2026-02-01",
  },
];

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>(testTasks);

  // just to test TaskForm renders
  const handleSubmit = (formData: TaskFormData) => {
    console.log("Form submitted:", formData);
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
