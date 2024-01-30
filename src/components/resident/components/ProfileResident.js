import axios from "axios";
import React, { useState, useEffect } from "react";

function BillsResident() {
  const [residents, setResidents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResidentId = () => {
      const userId = localStorage.getItem('id');

      axios.get(`http://localhost:8086/resident/getResidentIdByUserId/${userId}`)
        .then(response => {
          const residentId = response.data;

          if (residentId) {
            return axios.get(`http://localhost:8086/resident/getone/${residentId}`);
          } else {
            console.error("No residentId found in response");
          }
        })
        .then(residentResponse => {
          if (residentResponse) {
            setResidents([residentResponse.data]);
          }
        })
        .catch(error => {
          console.error("Error fetching data: ", error);
          setError(error);
        });
    };

    fetchResidentId();
  }, []);

  const handleUpdateUser = async (residentId, updatedUserData) => {
    try {
      const response = await axios.put(`http://localhost:8086/editUser/${residentId}`, updatedUserData);
      console.log(response.data); // Log the response for debugging

      // Handle the response as needed
      // For example, show a success message, update the state, etc.

    } catch (error) {
      console.error("Error updating user: ", error);
      // Handle the error, show an error message, etc.
    }
  };

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  return (
    <div className="card-body">
      {residents.map((resident, index) => (
        <div key={index} className="card mb-3" style={{ textAlign: 'justified' }}>
          <div className="card-body">
            <h1>Personal Information</h1>
            <p className="card-title">Name: {resident.name}</p>
            <p className="card-text">Phone: {resident.user.contact}</p>
            <p className="card-text">Email: {resident.user.email}</p>
            <p className="card-text">UserName: {resident.user.username}</p>
            <p className="card-text">Flat Number: {resident.user.flatNo}</p>
            
         </div>
        </div>
      ))}
    </div>
  );
}

export default BillsResident;
