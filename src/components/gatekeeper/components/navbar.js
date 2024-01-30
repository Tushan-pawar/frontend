  import React from 'react';
  import { Container } from 'react-bootstrap';
  import Nav from 'react-bootstrap/Nav';
  import Navbar from 'react-bootstrap/Navbar';
  import { useNavigate } from 'react-router-dom';

  function NavbarGatekeeper() {
    const navigate = useNavigate();

    return (
      <div>
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="/">Society Management System</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link onClick={() => navigate('/Gatekeeper/dashboard?page=notices')}> Notice Board </Nav.Link>
              <Nav.Link onClick={() => navigate('/Gatekeeper/dashboard?page=events')}>Events </Nav.Link>
              <Nav.Link onClick={() => navigate('/Gatekeeper/dashboard?page=visitorLog')}>VisitorLog </Nav.Link>
              <Nav.Link onClick={() => navigate('/Gatekeeper/dashboard?page=courierLog')}>CourierLog </Nav.Link>
            
            </Nav>
            <Navbar.Text > Logged in as: {localStorage.getItem('username')} </Navbar.Text > &nbsp;&nbsp;&nbsp;&nbsp;<Navbar.Brand onClick={() => navigate('/')}>Logout</Navbar.Brand>
          </Container>
        </Navbar>
      </div>
    );
  }

  export default NavbarGatekeeper;
