import type { TaskFilterProps, TaskFilterOptions } from "../../types";

export const TaskFilter = ({ filters, onFilterChange }: TaskFilterProps) => {
  return (
    <div>
      {/* Search box */}
      <input
        type="text"
        placeholder="Search tasks"
        value={filters.searchText}
        onChange={(e) =>
          onFilterChange({ ...filters, searchText: e.target.value })
        }
      />
      {/* Filter by Status */}
      <select
        value={filters.status}
        onChange={(e) =>
          onFilterChange({
            ...filters,
            status: e.target.value as TaskFilterOptions["status"],
          })
        }
      >
        <option value="all">All Status</option>
        <option value="todo">Todo</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      {/* Filter by priority */}
      <select
        value={filters.priority}
        onChange={(e) =>
          onFilterChange({
            ...filters,
            priority: e.target.value as TaskFilterOptions["priority"],
          })
        }
      >
        <option value="all">All Priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  );
};
