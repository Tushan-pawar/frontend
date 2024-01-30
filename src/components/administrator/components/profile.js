import React, { useState, useEffect } from "react";
import axios from "axios";

function ProfileAdministrator() {
  const [resident, setResident] = useState([]);
  const [administrator, setAdministrator] = useState([]);
  const [gatekeeper, setGatekeeper] = useState([]);

  const fetchResidents = () => {
    axios
      .get("http://localhost:8086/resident/getAllResidents")
      .then((e) => setResident(e.data))
      .catch((error) => console.error("Error fetching Residents: ", error));
  };

  const fetchAdmin = () => {
    axios
      .get("http://localhost:8086/admin/getAll")
      .then((e) => setAdministrator(e.data))
      .catch((error) =>
        console.error("Error fetching Administrators: ", error)
      );
  };

  const fetchGatekeeper = () => {
    axios
      .get("http://localhost:8086/gatekeeper/getAll")
      .then((e) => setGatekeeper(e.data))
      .catch((error) => console.error("Error fetching Gatekeepers: ", error));
  };

  const deleteUser = (id, role) => {
    axios
      .delete(`http://localhost:8086/${role}/delete/${id}`)
      .then((e) => {
        console.log(e.data);
        if (role === "Resident") {
          fetchResidents();
        } else if (role === "Administrator") {
          fetchAdmin();
        } else if (role === "Gatekeeper") {
          fetchGatekeeper();
        }
        alert("Deleted Successfully");
        fetchResidents();
        fetchAdmin();
        fetchGatekeeper();
   
      })
      .catch((error) => console.error("Error deleting user: ", error));
  };

  useEffect(() => {
    fetchResidents();
    fetchAdmin();
    fetchGatekeeper();
  }, []);

  return (
    <div className="row">
      <div className="col-md-6">
        <div className="card bg-light p-3">
          <ul className="list-group">
            <h1>Residents</h1>
            {resident.map((Resident) => (
              <li key={Resident.id} className="list-group-item">
                Name: {Resident.name}
                <br />
                Contact Number: {Resident.user.contact}
                <br />
                Email ID: {Resident.user.email}
                <br />
                Flat Number: {Resident.user.flatNo}
                <br />
                Role: {Resident.user.role}
                <br />
                User Name: {Resident.user.username}
                <br />
                <button
                  className="btn btn-primary"
                  onClick={() => deleteUser(Resident.id, "resident")}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <hr className="my-4" />
        </div>
      </div>

      <div className="col-md-6">
        <div className="card bg-light p-3">
          <ul className="list-group">
            <h1>Administrators</h1>
            {administrator.map((Administrator) => (
              <li key={Administrator.id} className="list-group-item">
                Name: {Administrator.name}
                <br />
                Contact Number: {Administrator.user.contact}
                <br />
                Email ID: {Administrator.user.email}
                <br />
                Flat Number: {Administrator.user.flatNo}
                <br />
                Role: {Administrator.user.role}
                <br />
                User Name: {Administrator.user.username}
                <br />
                <button
                  className="btn btn-primary"
                  onClick={() => deleteUser(Administrator.id, "admin")}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <hr className="my-4" />
        </div>
      </div>

      <div className="col-md-6">
        <div className="card bg-light p-3">
          <ul className="list-group">
            <h1>Gatekeepers</h1>
            {gatekeeper.map((Gatekeeper) => (
              <li key={Gatekeeper.id} className="list-group-item">
                Name: {Gatekeeper.name}
                <br />
                Contact Number: {Gatekeeper.user.contact}
                <br />
                Email ID: {Gatekeeper.user.email}
                <br />
                Flat Number: {Gatekeeper.user.flatNo}
                <br />
                Role: {Gatekeeper.user.role}
                <br />
                User Name: {Gatekeeper.user.username}
                <br />
                <button
                  className="btn btn-primary"
                  onClick={() => deleteUser(Gatekeeper.id, "gatekeeper")}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <hr className="my-4" />
        </div>
      </div>
    </div>
  );
}

export default ProfileAdministrator;
