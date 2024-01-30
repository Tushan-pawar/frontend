import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [flatNo, setFlatNo] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role] = useState('resident');

  const emailRegex = /\S+@\S+\.\S+/;
  const numericRegex = /^\d+$/;

  const postUser = () => {
    if (name === '') {
      alert('Please enter a valid name');
      return;
    }

    if (!numericRegex.test(contact) ) {
      alert('Please enter a valid numeric contact number');
      return;
    }

    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }


    if (username === '') {
      alert('Please enter a valid username');
      return;
    }

    if (password === '') {
      alert('Please enter a valid password');
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

    axios
      .post(`http://localhost:8086/${role}/add`, user)
      .then((response) => {
        console.log('Success');
        alert('Profile Created Successfully');
      })
      .catch(function (error) {
        console.log('Issue ');
        alert('Error in creating profile');
      });
  };

  return (
    <div className="container mt-4">
      <h2>Create Profile</h2>

      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Full Name
        </label>
        <input type="text" className="form-control" id="name" onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="mb-3">
        <label htmlFor="contact" className="form-label">
          Contact Number
        </label>
        <input type="number" className="form-control" id="contact" onChange={(e) => setContact(e.target.value)} />
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input type="text" className="form-control" id="email" onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className="mb-3">
        <label htmlFor="flatNo" className="form-label">
          Flat Number
        </label>
        <input type="number" className="form-control" id="flatNo" onChange={(e) => setFlatNo(e.target.value)} />
      </div>

      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input type="text" className="form-control" id="username" onChange={(e) => setUsername(e.target.value)} />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input type="text" className="form-control" id="password" onChange={(e) => setPassword(e.target.value)} />
      </div>

      <button className="btn btn-primary" onClick={() => postUser()}>
        Create Profile
      </button>
    </div>
  );
}

export default Signup;
