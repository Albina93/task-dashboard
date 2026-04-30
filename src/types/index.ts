export type TaskStatus = "todo" | "in-progress" | "done";
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: "low" | "medium" | "high";
  dueDate: string;
}
// form field values while typing
export interface TaskFormData {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  dueDate: string;
}

// validation error messages
export interface FormErrors {
  title?: string;
  description?: string;
  priority?: string;
  dueDate?: string;
}

// props passed into Taskform
export interface TaskFormProps {
  onSubmit: (formData: TaskFormData) => void;
}

export interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  onStatusChange: (id: string, newStatus: TaskStatus) => void;
}

export interface TaskListProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  onStatusChange: (id: string, newStatus: TaskStatus) => void;
}

export interface TaskFilterOptions {
  status: "all" | TaskStatus;
  priority: "all" | "low" | "medium" | "high";
  searchText: string;
}
export interface TaskFilterProps {
  filters: TaskFilterOptions;
  onFilterChange: (filters: TaskFilterOptions) => void;
}
