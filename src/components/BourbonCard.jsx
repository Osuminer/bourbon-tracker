import React from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import './BourbonCard.css'

const BourbonCard = ({ whisky }) => {
  const {
    _id,
    Name,
    // Bottler,
    ABV,
    Age,
    Rating,
    ImageURL
  } = whisky


  return (
    <Card className="mx-auto mb-5" style={{ width: "24rem" }} bg="body">
      <a href={_id}>
        <Card.Img variant="top" src={ImageURL} alt={Name} className="card-image"/>
      </a>
      <Card.Body>
        <Card.Title>{Name}</Card.Title>
      </Card.Body>
      <ListGroup variant="flush">
        {/* <ListGroupItem>
          <strong>Bottler:</strong> {Bottler}
        </ListGroupItem> */}
        <ListGroupItem>
          <strong>Age:</strong> {Age}
        </ListGroupItem>
        <ListGroupItem>
          <strong>APV:</strong> {ABV}
        </ListGroupItem>
        <ListGroupItem>
          <strong>Rating:</strong> {Rating}
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
};

export default BourbonCard;
