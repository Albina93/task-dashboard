import { useState } from "react";
import type { TaskFormData, FormErrors, TaskFormProps } from "../../types";

export const TaskForm = ({ onSubmit }: TaskFormProps) => {
  const [formdata, setFormdata] = useState<TaskFormData>({
    title: "",
    description: "",
    priority: "low",
    dueDate: "",
  });
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({ ...prev, [name]: value }));
  };

  const [errors, setErrors] = useState<FormErrors>({});
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate fields
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
    <div>
      <h3>Add new task</h3>
      <form onSubmit={handleSubmit}>
        {/* Title field */}
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={formdata.title}
          onChange={handleChange}
        />
        {errors.title && <p>{errors.title}</p>}
        {/* Description field */}
        <label>Description</label>
        <textarea
          name="description"
          value={formdata.description}
          onChange={handleChange}
        />
        {errors.description && <p>{errors.description}</p>}
        {/* Priority field */}
        <label>Priority</label>
        <select
          name="priority"
          value={formdata.priority}
          onChange={handleChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        {/* Due date */}
        <label>Due date</label>
        <input
          type="date"
          name="dueDate"
          value={formdata.dueDate}
          onChange={handleChange}
        />
        {errors.dueDate && <p>{errors.dueDate}</p>}
        <button type="submit">Add task</button>
      </form>
    </div>
  );
};
