import React, { useState, useEffect } from "react";
import MyNavbar from "./Navbar";
import BourbonCard from "./BourbonCard";
import { Row, Col } from "react-bootstrap";
import './App.scss'

const App = () => {
  // State to store the fetched whiskies
  const [whiskies, setWhiskies] = useState([]);

  useEffect(() => {
    // Function to fetch whiskies from backend
    const fetchWhiskies = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/whiskies");
        const data = await response.json();
        setWhiskies(data);
      } catch (error) {
        console.error("Error fetching whiskies:", error);
      }
    };


    fetchWhiskies();
  }, []);




  return (
    <div className="body">
      <MyNavbar />
      <div className="container mt-5">
        <Row>
          {whiskies.map((whisky) => (
            <Col key={whisky._id}>
              <BourbonCard whisky={whisky} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default App;
