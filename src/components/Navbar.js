import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "./Navbar.css";

const MyNavbar = () => {
  return (
    <Navbar className="py-4" bg="dark" variant="dark">
      <Navbar.Brand className="px-3" href="#home" draggable="false">
        Bourbon Tracker
      </Navbar.Brand>
      {/* <Nav className="ml-auto">
        <Nav.Link href="#home" draggable='false'>Home</Nav.Link>
        <Nav.Link href="#about" draggable='false'>About</Nav.Link>
        <Nav.Link href="#contact" draggable='false'>Contact</Nav.Link>
      </Nav> */}

      


    </Navbar>
  );
};

export default MyNavbar;
