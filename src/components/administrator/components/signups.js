import React, { useState } from "react";
import axios from "axios";

function SignupsAdministrator() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [flatNo, setFlatNo] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const roles = ["admin", "resident", "gatekeeper"];

  const postUser = () => {
    const usernameRegex = /\d+/;
    if (!usernameRegex.test(username)) {
      alert("Username must contain at least one number");
      return;
    }

    const user = {
      name,
      role,
      user: {
        name,
        username,
        password,
        email,
        contact,
        flatNo,
      },
    };

    if (name === "") {
      alert("Please Enter Valid Name");
      return;
    }
    if (password === "") {
      alert("Please Enter Valid Password");
      return;
    }
    if (email === "") {
      alert("Please Enter Valid Email");
      return;
    }
    if (contact === "") {
      alert("Please Enter Valid Contact");
      return;
    }
    if (flatNo === "") {
      alert("Please Enter Valid Flat Number");
      return;
    }

    axios
      .post(`http://localhost:8086/${role}/add`, user)
      .then((e) => {
        console.log("Success");
        alert("Profile Created Successfully");
      })
      .catch(function (error) {
        console.log("Issue ");
        alert("Error in creating profile");
      });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Users Creation Wizard</h2>

      <div className="card mb-3">
        <div className="card-body">
          <label htmlFor="name" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>

      <div className="card mb-3">
        <div className="card-body">
          <label htmlFor="contact" className="form-label">
            Contact Number
          </label>
          <input
            type="number"
            className="form-control"
            id="contact"
            onChange={(e) => setContact(e.target.value)}
          />
        </div>
      </div>

      <div className="card mb-3">
        <div className="card-body">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="card mb-3">
        <div className="card-body">
          <label htmlFor="flatNo" className="form-label">
            Flat Number
          </label>
          <input
            type="text"
            className="form-control"
            id="flatNo"
            onChange={(e) => setFlatNo(e.target.value)}
          />
        </div>
      </div>

      <div className="card mb-3">
        <div className="card-body">
          <label htmlFor="username" className="form-label">
            Default Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      </div>

      <div className="card mb-3">
        <div className="card-body">
          <label htmlFor="password" className="form-label">
            Default Password
          </label>
          <input
            type="text"
            className="form-control"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="card mb-3">
        <div className="card-body">
          <label htmlFor="role" className="form-label">
            Role
          </label>
          <select
            className="form-select"
            id="role"
            onChange={(e) => setRole(e.target.value)}
          >
            {roles.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button className="btn btn-primary" onClick={() => postUser()}>
        Create
      </button>
    </div>
  );
}

export default SignupsAdministrator;
