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
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onEdit={onEdit}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
};
