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
    <Navbar bg="secondary" variant="dark" className="p-4" sticky="top">
      <Navbar.Brand href="#home">Bourbon Tracker</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>

        <Form inline>
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
