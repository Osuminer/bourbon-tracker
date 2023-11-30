import React from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import "./Navbar.css";

const MyNavbar = () => {
  return (
    <Navbar
      bg="secondary"
      variant="dark"
      className="p-4"
      sticky="top"
      collapseOnSelect
      expand="sm"
    >
      <Navbar.Brand href="#home">Bourbon Tracker</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <NavDropdown title="More" id="basic-nav-dropdown">
            <NavDropdown.Item href="#collection">
              My Collection
            </NavDropdown.Item>
            <NavDropdown.Item href="#wishlist">My Wishlist</NavDropdown.Item>
          </NavDropdown>
        </Nav>

        <Form>
          <InputGroup>
            <InputGroup.Text>
              <i className="bi bi-search"></i>
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search"
              className=" mr-sm-2"
            />
            <Button type="submit">Search</Button>
          </InputGroup>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;
