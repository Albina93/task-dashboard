import type { TaskItemProps, TaskStatus } from "../../types";

export const TaskItem = ({
  task,
  onDelete,
  onEdit,
  onStatusChange,
}: TaskItemProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-3 border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold text-gray-800">Title: {task.title}</h2>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full ${
            task.priority === "high"
              ? "bg-red-100 text-red-600"
              : task.priority === "medium"
                ? "bg-yellow-100 text-yellow-600"
                : "bg-green-100 text-green-600"
          }`}
        >
          Priority: {task.priority}
        </span>
      </div>
      <p className="text-gray-600 text-sm mb-2">
        Description: {task.description}
      </p>
      <p className="text-gray-400 text-xs mb-3">Due date: {task.dueDate}</p>

      <div className="flex items-center justify-between">
        <select
          value={task.status}
          onChange={(e) =>
            onStatusChange(task.id, e.target.value as TaskStatus)
          }
          className="text-sm border border-gray-300 rounded px-2 py-1 text-gray-700"
        >
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task)}
            className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
