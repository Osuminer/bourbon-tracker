import React from "react";
import MyNavbar from "./Navbar";
import BourbonCard from "./BourbonCard";
import './App.scss'
import { Row, Col } from "react-bootstrap";

const numberOfItems = 15

const App = () => {
  return (
    <div className="body">
      <MyNavbar />
      <div className="container mt-5">
        <Row>
          {Array.from(Array(numberOfItems).keys()).map(number => (
            <Col key={number}>
              <BourbonCard />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default App;
