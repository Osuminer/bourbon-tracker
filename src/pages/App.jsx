import React, { useState, useEffect } from "react";
import MyNavbar from "../components/Navbar";
import BourbonCard from "../components/BourbonCard";
import { Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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

        // onSearch("angel")
      } catch (error) {
        console.error("Error fetching whiskies:", error);
      }
    };


    fetchWhiskies();
  }, []);


  const onSearch = async (searchTerm) => {
    try {
      searchTerm = encodeURIComponent(searchTerm);
      const response = await fetch(`http://localhost:5000/api/whiskies?q=${searchTerm}`);
      const data = await response.json();
      setWhiskies(data);
    } catch (error) {
      console.error('Error fetching whiskies:', error);
    }
  };

  return (
    <Router>
      <div className="body">
        <MyNavbar onSearch={onSearch} />
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
    </Router>
  );
};

export default App;
