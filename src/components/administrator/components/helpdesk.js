import React, { useState, useEffect } from "react";
import axios from "axios";

const HelpDeskAdministrator = () => {
  const [tickets, setTickets] = useState([]);
  const [editedTicket, setEditedTicket] = useState({
    id: null,
    name: "",
    date: "",
    description: "",
    status: "",
    resident: {
      id: "",
    },
  });

  useEffect(() => {
    axios
      .get("http://localhost:8086/helpdesk/allTickets/")
      .then((response) => setTickets(response.data))
      .catch((error) => console.error("Error fetching Tickets:", error));
  }, []);

  const handleEdit = (ticket) => {
    setEditedTicket({
      id: ticket.id,
      name: ticket.name,
      date: ticket.date,
      description: ticket.description,
      status: ticket.status,
      resident: {
        id: ticket.resident.id,
      },
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTicket((prevTicket) => ({
      ...prevTicket,
      [name]: value,
    }));
  };

  const handleUpdateClick = () => {
    const { id, name, date, description, status, resident } = editedTicket;

    axios
      .put(`http://localhost:8086/helpdesk/updateAnotherTicket/${id}`, {
        name,
        date,
        description,
        status,
        resident: {
          id: resident.id,
        },
      })
      .then((response) => {
        setTickets((prevTickets) => {
          const updatedTickets = prevTickets.map((ticket) => {
            if (ticket.id === id) {
              return response.data;
            }
            return ticket;
          });
          return updatedTickets;
        });

        setEditedTicket({
          id: null,
          name: "",
          date: "",
          description: "",
          status: "",
          resident: {
            id: "",
          },
        });
      })
      .catch((error) => console.error("Error updating ticket:", error));
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Reply to Tickets</h1>

      <div className="card">
        <div className="card-body">
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Flat Number</th>
                <th>User Name</th>
                <th>Date</th>
                <th>Description</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td>{ticket.resident.user.flatNo}</td>
                  <td>{ticket.name}</td>
                  <td>{ticket.date}</td>
                  <td>{ticket.description}</td>
                  <td>{ticket.status}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleEdit(ticket)}
                    >
                      Reply
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {editedTicket.id && (
            <div className="mt-4">
              <h3>Edit Ticket</h3>
              <div className="mb-3">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  name="date"
                  value={editedTicket.date}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  value={editedTicket.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="status">Status</label>
                <select
                  className="form-control"
                  id="status"
                  name="status"
                  value={editedTicket.status}
                  onChange={handleInputChange}
                >
                  <option value="Active">ACTIVE</option>
                  <option value="Closed">CLOSED</option>
                </select>
              </div>
              <button className="btn btn-success" onClick={handleUpdateClick}>
                Update Ticket
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HelpDeskAdministrator;
