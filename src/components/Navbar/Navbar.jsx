import React, { useState } from "react";
import {useNavigate } from 'react-router-dom';
import {
  Navbar,
  Nav,
  Form,
  InputGroup,
} from "react-bootstrap";

import UserDropdown from "./UserDropdown";

import "./Navbar.css";

const MyNavbar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      navigate(`/?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <Navbar
      bg="secondary"
      variant="dark"
      className="p-4"
      sticky="top"
      collapseOnSelect
      expand="sm"
    >
      <Navbar.Brand className="logo" onClick={() => {navigate('/?p=0')}}>Bourbon Tracker</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link onClick={() => {navigate('/?p=0')}}>Home</Nav.Link>
          <Nav.Link onClick={() => {navigate('/wishlist')}}>My Wishlist</Nav.Link>
          <Nav.Link onClick={() => {navigate('/collection')}}>My Collection</Nav.Link>
        </Nav>

        <UserDropdown />

        <Form>
          <InputGroup>
            <InputGroup.Text>
              <i className="bi bi-search"></i>
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </InputGroup>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;
