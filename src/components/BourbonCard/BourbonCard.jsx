import React, { useEffect, useState } from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link } from 'react-router-dom'

import TagComponent from "../TagComponent/TagComponent";

import './BourbonCard.css'

const BourbonCard = ({ whisky, userId }) => {
  const [show, setShow] = useState(false)

  const {
    _id,
    Name,
    ABV,
    Rating,
    ImageURL
  } = whisky

  useEffect(() => {
    setShow(true)
  }, [])

  let urlLink = `/whiskies/${_id}`

  if (userId) {
    urlLink += `?u=${userId}`
  }

  return (
    <Card className={`mx-auto mb-5 whisky-card shadow ${show ? 'fade-in' : ''}`} style={{ maxWidth: "24rem", minWidth: '20rem' }} bg="body">
      <Link to={urlLink}>
        <Card.Img variant="top" src={ImageURL} alt={Name} className="card-image" />
      </Link>
      <Card.Body>
        <Card.Title>{Name}</Card.Title>
      </Card.Body>
      <ListGroup variant="flush">
        <ListGroupItem style={{paddingTop: "2px", paddingBottom: "2px"}}>
          {whisky.Tags.map((tag, index) => (
            <TagComponent tag={tag} key={index} />
          ))}
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
