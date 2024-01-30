import React from "react";
import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";

function NavbarAdministrator() {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Society Management System</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => navigate("/Administrator/dashboard?page=notices")}
            >
              Notice Board
            </Nav.Link>
            <Nav.Link
              onClick={() => navigate("/Administrator/dashboard?page=events")}
            >
              Events
            </Nav.Link>
            <Nav.Link
              onClick={() => navigate("/Administrator/dashboard?page=bills")}
            >
              Bills
            </Nav.Link>
            <Nav.Link
              onClick={() => navigate("/Administrator/dashboard?page=helpdesk")}
            >
              Help Desk
            </Nav.Link>
            <Nav.Link
              onClick={() => navigate("/Administrator/dashboard?page=signups")}
            >
              User Creation wizard
            </Nav.Link>
            <Nav.Link
              onClick={() => navigate("/Administrator/dashboard?page=profile")}
            >
              User Manager
            </Nav.Link>
          </Nav>
          <Navbar.Text>
            {" "}
            Logged in as: {localStorage.getItem("username")}{" "}
          </Navbar.Text>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Navbar.Brand onClick={() => navigate("/")}>Logout</Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarAdministrator;
