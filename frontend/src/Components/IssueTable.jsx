import React, { useState } from "react";
import axios from "axios";

function IssueTable() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Low",
    due: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/tickets", {
        title: form.title,
        description: form.description,
        priority: form.priority,
        due: form.due,
        status: "open",
      });

      alert("Issue submitted successfully!");

      // Refresh issue list
      window.dispatchEvent(new Event("ticketCreated"));

      // Reset form
      setForm({
        title: "",
        description: "",
        priority: "Low",
        due: "",
      });
    } catch (error) {
      console.error("Error submitting issue:", error);
      alert("Failed to submit issue");
    }
  };

  return (
    <div className="issue-form-container">
      <h2>Issue Tracker</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <br />
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Description</label>
          <br />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>

        <br />

        <div>
          <label>Priority</label>
          <br />
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <br />

        <div>
          <label>Due</label>
          <br />
          <input
            type="text"
            name="due"
            value={form.due}
            onChange={handleChange}
            placeholder=""
            required
          />
        </div>

        <br />

        <button type="submit">Submit Issue</button>
      </form>
    </div>
  );
}

export default IssueTable;