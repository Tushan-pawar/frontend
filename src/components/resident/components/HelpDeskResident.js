import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HelpDeskResident() {
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [tickets, setTickets] = useState([]);
  const [residentId, setResidentId] = useState(null);

  const [editedTicket, setEditedTicket] = useState({
    id: null,
    name: '',
    description: '',
    date: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUsername = localStorage.getItem('username');
        setUsername(storedUsername);

        const userId = localStorage.getItem("id");
        const residentIdResponse = await axios.get(`http://localhost:8086/resident/getResidentIdByUserId/${userId}`);
        const newResidentId = residentIdResponse.data;

        if (newResidentId !== null) {
          setResidentId(newResidentId);

          const ticketsResponse = await axios.get(`http://localhost:8086/helpdesk/getTicket/${newResidentId}`);
          setTickets(ticketsResponse.data);
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchData();
  }, []);

  const handleAddTicket = async () => {
    try {
      if (!description || !date) {
        window.alert('Please fill out all required fields.');
        return;
      }
      const userId = localStorage.getItem("id");
      const residentIdResponse = await axios.get(`http://localhost:8086/resident/getResidentIdByUserId/${userId}`);
      const residentId = residentIdResponse.data;

      const response = await axios.post(`http://localhost:8086/helpdesk/addticket/${residentId}`, {
        name: username,
        description,
        date,
      });

      console.log('Ticket added:', response.data);
      window.alert('Ticket added successfully!');

      const ticketsResponse = await axios.get(`http://localhost:8086/helpdesk/getTicket/${residentId}`);
      setTickets(ticketsResponse.data);
    } catch (error) {
      console.error('Error adding ticket:', error.message);
    }
  };

  const handleEditClick = (ticket) => {
    const { id, name, description, date } = ticket;
    setEditedTicket({
      id: id,
      name: name,
      description: description,
      date: date,
    });
  };

  const handleUpdateTicket = async () => {
    const { id, name, description, date } = editedTicket;

    try {
      const response = await axios.put(`http://localhost:8086/helpdesk/updateAnotherTicket/${id}`, {
        name,
        description,
        date,
      });

      console.log('Ticket updated:', response.data);
      window.alert('Ticket updated successfully!');

      const ticketsResponse = await axios.get(`http://localhost:8086/helpdesk/getTicket/${residentId}`);
      setTickets(ticketsResponse.data);

      setEditedTicket({
        id: null,
        name: '',
        description: '',
        date: '',
      });
    } catch (error) {
      console.error('Error updating ticket:', error.message);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">Help Desk</h1>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">Add ticket Description</label>
            <textarea
              className="form-control"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="date" className="form-label">Date</label>
            <input
              type="date"
              className="form-control"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <button className="btn btn-primary" onClick={handleAddTicket}>Add Ticket</button>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-body">
          <h5 className="card-title">Previous Tickets</h5>
          <ul>
            {tickets.map((ticket) => (
              <li key={ticket.id}>
                <strong>User Name:</strong> {ticket.name}, <strong>Description:</strong> {ticket.description}, <strong>Date:</strong> {ticket.date}
                <button
                  className="btn btn-primary"
                  onClick={() => handleEditClick(ticket)}
                >
                  Reply
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {editedTicket.id && (
        <div className="card mt-4">
          <div className="card-body">
            <h3 className="card-title">Reply Ticket</h3>
            <div className="mb-3">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                className="form-control"
                id="date"
                value={editedTicket.date}
                onChange={(e) => setEditedTicket({ ...editedTicket, date: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                id="description"
                value={editedTicket.description}
                onChange={(e) => setEditedTicket({ ...editedTicket, description: e.target.value })}
              />
            </div>
            <button
              className="btn btn-success"
              onClick={handleUpdateTicket}
            >
              Update Ticket
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HelpDeskResident;
