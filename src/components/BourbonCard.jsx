import React from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

const BourbonCard = () => {
  return (
    <Card className="mx-auto mb-5" style={{ width: "18rem"}}>
      <a href="#item">
        <Card.Img variant="top" src="https://via.placeholder.com/500x300" />
      </a>
      <Card.Body>
        <Card.Title>Title</Card.Title>
      </Card.Body>
      <ListGroup variant="flush">
        <ListGroupItem>
          <strong>Bottler:</strong>
        </ListGroupItem>
        <ListGroupItem>
          <strong>Age:</strong>
        </ListGroupItem>
        <ListGroupItem>
          <strong>APV:</strong>
        </ListGroupItem>
        <ListGroupItem>
          <strong>Rating:</strong>
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
};

export default BourbonCard;
