import React, { useState, useEffect } from 'react';
import axios from 'axios';

function VisitorLog() {
  const [visitorLogs, setVisitorLogs] = useState([]);

  useEffect(() => {
    const fetchVisitorLogs = () => {
      axios
        .get('http://localhost:8086/visitorlogs/getall')
        .then((response) => {
          setVisitorLogs(response.data);
        })
        .catch((error) => {
          console.error('Error fetching visitor logs:', error.message);
        });
    };

    fetchVisitorLogs();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Visitor Log</h1>

      {visitorLogs.map((visitorLog) => (
        <div key={visitorLog.id} className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Resident Name: {visitorLog.resident.user.name}</h5>
            <p className="card-text">Resident UserName: {visitorLog.resident.user.username}</p>
            <p className="card-text">Visitor Name: {visitorLog.visitorName}</p>
            <p className="card-text">Entry Date: {visitorLog.entryTime}</p>
            <p className="card-text">Exit Date: {visitorLog.exitTime}</p>
            <p className="card-text">Visitor Contact: {visitorLog.visitorContact}</p>
          </div>
        </div>
      ))}
    

    </div>
  );
}

export default VisitorLog;
