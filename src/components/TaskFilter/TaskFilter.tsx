import type { TaskFilterProps, TaskFilterOptions } from "../../types";

export const TaskFilter = ({ filters, onFilterChange }: TaskFilterProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6 border border-gray-200">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        {/* Search box */}
        <input
          type="text"
          placeholder="Search tasks"
          value={filters.searchText}
          onChange={(e) =>
            onFilterChange({ ...filters, searchText: e.target.value })
          }
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
    </div>
  );
};
