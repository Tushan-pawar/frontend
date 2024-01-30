import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CourierLogs() {
  const [courierLogs, setCourierLogs] = useState([]);

  useEffect(() => {
    const fetchCourierLogs = () => {
      axios
        .get('http://localhost:8086/courierlogs/getall')
        .then((response) => {
          setCourierLogs(response.data);
        })
        .catch((error) => {
          console.error('Error fetching courier logs:', error.message);
        });
    };

    fetchCourierLogs();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Courier Log</h1>

      {courierLogs.map((courierLog) => (
        <div key={courierLog.id} className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Courier Name: {courierLog.courierName}</h5>
            <p className="card-text">Delivery Day: {courierLog.entryTime}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CourierLogs;
