import { useState } from "react";
import type { TaskFormData, FormErrors, TaskFormProps } from "../../types";

export const TaskForm = ({ onSubmit }: TaskFormProps) => {
  const [formdata, setFormdata] = useState<TaskFormData>({
    title: "",
    description: "",
    priority: "low",
    dueDate: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: FormErrors = {};
    // check the title is empty or just spaces
    if (!formdata.title.trim()) {
      newErrors.title = "Title is required!";
    }
    if (!formdata.description) {
      newErrors.description = "Description is required!";
    }
    if (!formdata.dueDate) {
      newErrors.dueDate = "Due Date is required!";
    }
    // if errors exist show them and stop
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // No errors... submit and reset
    onSubmit(formdata);

    // Need to be able to reset the form after submitting
    setFormdata({
      title: "",
      description: "",
      priority: "low",
      dueDate: "",
    });
    setErrors({}); // clear errors after successful submit
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6 border border-gray-200">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Add new task</h3>
      <form onSubmit={handleSubmit}>
        {/* Title field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formdata.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title}</p>
          )}
        </div>
        {/* Description field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formdata.description}
            onChange={handleChange}
            placeholder="Enter task description"
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">{errors.description}</p>
          )}
        </div>
        {/* Priority field */}
        <div className="flex-1 mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <select
            name="priority"
            value={formdata.priority}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        {/* Due date */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Due date
          </label>
          <input
            type="date"
            name="dueDate"
            value={formdata.dueDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.dueDate && (
            <p className="text-red-500 text-xs mt-1">{errors.dueDate}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 mt-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
        >
          Add task
        </button>
      </form>
    </div>
  );
};
