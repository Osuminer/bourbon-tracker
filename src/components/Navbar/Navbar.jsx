import React, { useState } from "react";
import {useNavigate, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const userId = new URLSearchParams(location.search).get('u');

  // Handles when a button on the navbar is pressed
  const handleLinkClick = (path) => {
    const urlBuilder = []
    
    if (!path.includes("?")) {
      path += '?'  
    }

    urlBuilder.push(path);

    
    if (userId) {
      urlBuilder.push(`u=${userId}`);
    }

    const url = urlBuilder.join('&')

    navigate(url);

  };

  // Handles when the enter key is pressed
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      let url = '/';

      if (userId || searchTerm) {
        url += '?'
      }
  
      if (userId) {
        url += `u=${userId}&`;
      }
  
      if (searchTerm) {
        url += `q=${encodeURIComponent(searchTerm)}`;
      }
  
      navigate(url);
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
      <Navbar.Brand className="logo" onClick={() => handleLinkClick('/?p=0')}>Bourbon Tracker</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link onClick={() => handleLinkClick('/?p=0')}>Home</Nav.Link>
          <Nav.Link onClick={() => handleLinkClick('/wishlist')}>My Wishlist</Nav.Link>
          <Nav.Link onClick={() => handleLinkClick('/collection')}>My Collection</Nav.Link>
        </Nav>

        <UserDropdown currentUserId={userId} />

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
