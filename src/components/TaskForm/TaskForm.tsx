import React, { useState } from "react";
import type { TaskFormData, FormErrors, TaskFormProps } from "../../types";

export const TaskForm = ({ onSubmit }: TaskFormProps) => {
  const [formdata, setFormdata] = useState<TaskFormData>({
    title: "",
    description: "",
    priority: "low",
    dueDate: "",
  });
  // const [errors, setErrors] = useState<FormErrors>({});
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
    console.log("Form data: ", formdata);
    onSubmit(formdata);
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
        {/* Description field */}
        <label>Description</label>
        <textarea
          name="description"
          value={formdata.description}
          onChange={handleChange}
        />
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
        <label>Due date</label>
        <input
          type="date"
          name="dueDate"
          value={formdata.dueDate}
          onChange={handleChange}
        />
        <button type="submit">Add task</button>
      </form>
    </div>
  );
};
