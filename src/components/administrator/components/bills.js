import axios from "axios";
import React, { useState, useEffect } from "react";

function BillsAdministrator() {
  const [particulars, setParticulars] = useState("");
  const [amount, setAmount] = useState("");
  const [lastDate, setLastDate] = useState("");
  const [residentId, setResidentId] = useState("");
  const [recentlyCreatedBills, setRecentlyCreatedBills] = useState([]);
  const [paidBills, setPaidBills] = useState([]);

  const postBills = () => {
    const newBill = {
      particulars: particulars,
      amount: amount,
      lastDate: lastDate,
    };
    axios
      .post(`http://localhost:8086/bills/addBills/${residentId}`, newBill)
      .then(() => {
        setParticulars("");
        setAmount("");
        setLastDate("");
        alert("Bill created successfully");
        fetchRecentlyCreatedBills();
        fetchPaidBills();
      })
      .catch(() => {
        alert("Please check the fields");
      });
  };

  const fetchRecentlyCreatedBills = () => {
    axios
      .get(`http://localhost:8086/bills/getall/`)
      .then((response) => setRecentlyCreatedBills(response.data))
      .catch(() => {
        alert("Error fetching recently created bills");
      });
  };

  const fetchPaidBills = () => {
    axios
      .get(`http://localhost:8086/bills/getall/paid/`)
      .then((response) => setPaidBills(response.data))
      .catch(() => {
        alert("Error fetching paid bills");
      });
  };

  useEffect(() => {
    fetchRecentlyCreatedBills();
    fetchPaidBills();
  }, []);

  return (
    <div className="container mt-4">
      <img
        src="https://www.hostbooks.com/in/assets/images/gst-e-invoicing-system/new/e-invoice.png"
        className="img-fluid icon"
        alt="Icon"
        style={{ width: "250px", height: "250px" }}/>
      <h1>Create Bills</h1>

      <div className="card">
        <div className="card-body">
          <div className="d-flex flex-column align-items-center">
            <div className="form-outline mb-4 text-center">
              <label htmlFor="particulars" className="form-label">
                Particulars
              </label>
              <select
                id="particulars"
                className="form-select form-select-sm text-center"
                value={particulars}
                onChange={(e) => setParticulars(e.target.value)}
              >
                <option value="">Select Particulars</option>
                <option value="Water Bill">Water Bill</option>
                <option value="Electricity Bill">Electricity Bill</option>
                <option value="Construction Bill">Construction Bill</option>
              </select>
            </div>

            <div className="form-outline mb-4 text-center">
              <label htmlFor="amount" className="form-label">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                className="form-control form-control-sm text-center"
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="form-outline mb-4 text-center">
              <label htmlFor="residentId" className="form-label">
                Resident ID
              </label>
              <input
                type="text"
                id="residentId"
                className="form-control form-control-sm text-center"
                value={residentId}
                onChange={(e) => setResidentId(e.target.value)}
              />
            </div>

            <div className="form-outline mb-4 text-center">
              <label htmlFor="lastDate" className="form-label">
                Last Date
              </label>
              <input
                type="date"
                id="lastDate"
                className="form-control form-control-sm text-center"
                onChange={(e) => setLastDate(e.target.value)}
              />
            </div>

            <button
              className="btn btn-primary"
              onClick={(e) => postBills(e.target.value)}
            >
              Post
            </button>
          </div>
        </div>
      </div>

      <div className="dropdown">
        <div className="card-body">
          <h2>Recently Created Bills</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Amount</th>
                <th>Particulars</th>
                <th>Resident Name</th>
                <th>Flat Number</th>
                <th>Resident Contact Number</th>
                <th>Last Date</th>
              </tr>
            </thead>
            <tbody>
              {recentlyCreatedBills.map((bill, index) => (
                <tr key={index}>
                  <td>Rs.{bill.amount}</td>
                  <td>{bill.particulars}</td>
                  <td>{bill.resident.name}</td>
                  <td>{bill.resident.user.flatNo}</td>
                  <td>{bill.resident.user.contact}</td>
                  <td>{bill.lastDate}</td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-body">
          <h2>Paid Bills</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Amount</th>
                <th>Particulars</th>
                <th>Resident Name</th>
                <th>Flat Number</th>
                <th>Resident Contact Number</th>
                <th>Last Date</th>
              </tr>
            </thead>
            <tbody>
              {paidBills.map((bill, index) => (
                <tr key={index}>
                  <td>Rs.{bill.amount}</td>
                  <td>{bill.particulars}</td>
                  <td>{bill.resident.name}</td>
                  <td>{bill.resident.user.flatNo}</td>
                  <td>{bill.resident.user.contact}</td>
                  <td>{bill.lastDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BillsAdministrator;
