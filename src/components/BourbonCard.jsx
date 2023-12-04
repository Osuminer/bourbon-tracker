import React from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import {Link} from 'react-router-dom'
import './BourbonCard.css'

const BourbonCard = ({ whisky }) => {
  const {
    _id,
    Name,
    ABV,
    Age,
    Rating,
    ImageURL
  } = whisky


  return (
    <Card className="mx-auto mb-5" style={{ maxWidth: "24rem", minWidth: '20rem'}} bg="body">
      <Link to={_id}>
        <Card.Img variant="top" src={ImageURL} alt={Name} className="card-image"/>
      </Link>
      <Card.Body>
        <Card.Title>{Name}</Card.Title>
      </Card.Body>
      <ListGroup variant="flush">
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
