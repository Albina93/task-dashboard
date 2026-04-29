import type { TaskItemProps, TaskStatus } from "../../types";

export const TaskItem = ({
  task,
  onDelete,
  onEdit,
  onStatusChange,
}: TaskItemProps) => {
  return (
    <div>
      <h2>Title: {task.title}</h2>
      <p>Description: {task.description}</p>
      <p>Priority: {task.priority}</p>
      <p>Due date: {task.dueDate}</p>

      <select
        value={task.status}
        onChange={(e) => onStatusChange(task.id, e.target.value as TaskStatus)}
      >
        <option value="todo">Todo</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <button onClick={() => onEdit(task)}>Edit</button>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
};
