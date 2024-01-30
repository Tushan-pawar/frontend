import React, { useState, useEffect } from "react";
import axios from "axios";

function GateUpdate() {
  const [visitorLogs, setVisitorLogs] = useState([]);
  const [courierLogs, setCourierLogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("id");

        const residentIdResponse = await axios.get(`http://localhost:8086/resident/getResidentIdByUserId/${userId}`);
        const newResidentId = residentIdResponse.data;

        const visitorLogsResponse = await axios.get(`http://localhost:8086/visitorlogs/getbyresident/${newResidentId}`);
        setVisitorLogs(visitorLogsResponse.data);

        const courierLogsResponse = await axios.get(`http://localhost:8086/courierlogs/getcourier/${newResidentId}`);
        setCourierLogs(courierLogsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div className="alert alert-danger">Error fetching data: {error.message}</div>;
  }

  return (
    <div className="container mt-4">

      <div className="card mb-4">
        <h1>
          <div className="card-header">Visitor Logs</div>
        </h1>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Visitor ID</th>
                <th>Visitor Name</th>
                <th>Entry Date</th>
                <th>Exit Date</th>
                <th>Gatekeeper name</th>
              </tr>
            </thead>
            <tbody>
              {visitorLogs.map((visitorLog, index) => (
                <tr key={index}>
                  <td>{visitorLog.id}</td>
                  <td>{visitorLog.visitorName}</td>
                  <td>{visitorLog.entryTime}</td>
                  <td>{visitorLog.exitTime}</td>
                  <td>{visitorLog.gatekeeper.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <h1>
          <div className="card-header">Courier Logs</div>
        </h1>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Courier Name</th>
                <th>Delivery Date</th>
              </tr>
            </thead>
            <tbody>
              {courierLogs.map((courierLog, index) => (
                <tr key={index}>
                  <td>{courierLog.courierName}</td>
                  <td>{courierLog.entryTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default GateUpdate;
