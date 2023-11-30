import React from "react";
import { Card, Button } from "react-bootstrap";

const BourbonCard = () => {
  return (
    <Card className="mx-auto" style={{ width: "18rem"}}>
      <Card.Img variant="top" src="https://via.placeholder.com/500" />
      <Card.Body>
        <Card.Title>Sample Card</Card.Title>
        <Card.Text>This is a sample card in the body of the app</Card.Text>
        <Button variant="primary">Go Somewhere</Button>
      </Card.Body>
    </Card>
  );
};


export default BourbonCard
