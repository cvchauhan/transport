import React from 'react';
import './Header.css';
import { IconContext } from 'react-icons';
import { Navbar, Nav, Col, Row  } from 'react-bootstrap';

function Header() {
  return (
    <>
    <IconContext.Provider value={{ }}>
      <Navbar id="navbar">
        <Row className="px-5">
          <Col > 
              <Navbar.Brand href="#home" className="text-white">Lori Receipt</Navbar.Brand>
          </Col>
          <Col> 
            <Nav className="pull-right">
              <Nav.Link href="#home" className="text-white">Home</Nav.Link>
              <Nav.Link href="#features" className="text-white">Features</Nav.Link>
              <Nav.Link href="#pricing" className="text-white">Pricing</Nav.Link>
            </Nav>
          </Col>
        </Row>
      </Navbar>
  </IconContext.Provider> 
    </>
  );
}

export default Header ;
