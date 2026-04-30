import type { TaskListProps } from "../../types";
import { TaskItem } from "./TaskItem";

export const TaskList = ({
  tasks,
  onDelete,
  onEdit,
  onStatusChange,
}: TaskListProps) => {
  return (
    <div>
      {/* Show message if no task found */}
      {tasks.length === 0 ? (
        <div className="text-center py-10 text-gray-400">
          <p className="text-lg font-medium">No tasks found</p>
          <p className="text-sm">You can add new task...!</p>
        </div>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={onDelete}
            onEdit={onEdit}
            onStatusChange={onStatusChange}
          />
        ))
      )}
    </div>
  );
};
