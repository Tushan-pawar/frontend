import React from 'react'; 
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
function NavbarResident() {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Society Management System</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate('/Resident/dashboard?page=notices')}> Notice Board </Nav.Link>
            <Nav.Link onClick={() => navigate('/Resident/dashboard?page=events')}>Events </Nav.Link>
            <Nav.Link onClick={() => navigate('/Resident/dashboard?page=bills')}>Bills </Nav.Link>
            <Nav.Link onClick={() => navigate('/Resident/dashboard?page=helpdesk')}> Help Desk</Nav.Link>
            <Nav.Link onClick={() => navigate('/Resident/dashboard?page=gate')}> Gate Updates</Nav.Link>
            <Nav.Link onClick={() => navigate('/Resident/dashboard?page=profile')}>Profile </Nav.Link>
          </Nav>
          <Navbar.Text > Logged in as: {localStorage.getItem('username')} </Navbar.Text > &nbsp;&nbsp;&nbsp;&nbsp;<Navbar.Brand onClick={() => navigate('/')}>Logout</Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarResident;
