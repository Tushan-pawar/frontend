import React, { useState, useEffect } from "react";
import axios from "axios";
        
function BillsResident() {
  const [allBills, setAllBills] = useState([]);
  const [paidBills, setPaidBills] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResidentId = async () => {
      try {
        const userId = localStorage.getItem("id");
        const residentIdResponse = await axios.get(`http://localhost:8086/resident/getResidentIdByUserId/${userId}`);
        const residentId = residentIdResponse.data;

        if (residentId) {
          const allBillsResponse = await axios.get(`http://localhost:8086/bills/getall/${residentId}`);
          setAllBills(allBillsResponse.data);

          const paidBillsResponse = await axios.get(`http://localhost:8086/bills/getall/paid/${residentId}`);
          setPaidBills(paidBillsResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError(error);
      }
    };

    fetchResidentId();
  }, []);

  const handlePayBill = (billId) => {
    alert("Bill status will be updated as paid!");
  };

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  return (
    <div className="container mt-4">
      <div className="card mt-4">
        <div className="card-body"> <img
        src="https://images.pexels.com/photos/4386465/pexels-photo-4386465.jpeg?auto=compress&cs=tinysrgb&h=350"
        alt="new"
        style={{ width: "330px", height: "200px" }} 
      />
          <h1 className="mb-4 text-center">All Bills</h1>
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
              {allBills.map((bill, index) => (
                <tr key={index}>
                  <td>Rs.{bill.amount}</td>
                  <td>{bill.particulars}</td>
                  <td>{bill.resident.name}</td>
                  <td>{bill.resident.user.flatNo}</td>
                  <td>{bill.resident.user.contact}</td>
                  <td>{bill.lastDate}</td>
                  <td>
                    {bill.paid !== "Paid" && (
                      <button className="btn btn-primary" onClick={() => handlePayBill(bill.id)}>
                        Pay bill
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-body">
          <h1 className="mb-4 text-center">Paid Bills</h1>
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

export default BillsResident;
