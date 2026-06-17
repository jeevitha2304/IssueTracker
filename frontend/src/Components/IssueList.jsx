import React, { useState, useEffect } from "react";
import axios from "axios";

function IssueList() {
  const [tickets, setTickets] = useState([]);

  // Fetch tickets
  const fetchTickets = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/Issues");
      setTickets(res.data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  // Delete ticket
  const deleteTicket = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/Issues/${id}`);

      setTickets((prevTickets) =>
        prevTickets.filter((ticket) => ticket._id !== id)
      );

      alert("Issue deleted successfully");
    } catch (error) {
      console.error("Error deleting issue:", error);
      alert("Error deleting issue");
    }
  };

  // Update status
  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/Issues/${id}`, {
        status: newStatus,
      });

      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket._id === id
            ? { ...ticket, status: newStatus }
            : ticket
        )
      );

      alert("Status updated successfully");
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Error updating status");
    }
  };

  useEffect(() => {
    fetchTickets();

    const handler = () => fetchTickets();

    window.addEventListener("ticketCreated", handler);

    return () => {
      window.removeEventListener("ticketCreated", handler);
    };
  }, []);

  return (
    <div className="ticket-list">
      <h2>Placeholder IssueList</h2>

      {tickets.map((ticket) => (
        <div key={ticket._id} className="ticket-card">
          <p>
            <strong>Title:</strong> {ticket.title}
          </p>

          <p>
            <strong>Description:</strong> {ticket.description}
          </p>

          <p>
            <strong>Priority:</strong> {ticket.priority}
          </p>
          <p>
            <strong>Due:</strong> {ticket.due}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`status-badge ${
                ticket.status?.toLowerCase() === "open"
                  ? "status-open"
                  : ticket.status?.toLowerCase() === "in progress"
                  ? "status-in-progress"
                  : "status-resolved"
              }`}
            >
              {ticket.status}
            </span>
          </p>

          <p>
            <strong>Due:</strong> {ticket.due}
          </p>

          <div className="ticket-button">
            <button
              onClick={() => updateStatus(ticket._id, "resolved")}
            >
              Resolve
            </button>

            <button
              onClick={() => updateStatus(ticket._id, "in progress")}
            >
              In Progress
            </button>

            <button
              className="delete-btn"
              onClick={() => deleteTicket(ticket._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default IssueList;