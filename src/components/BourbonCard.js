import React from "react";
import { Card, Row, Col } from "react-bootstrap";

const BourbonCard = () => {
  return (
    <Card className="mx-auto" style={{ width: "18rem" }}>
			<a href="#">
      	<Card.Img variant="top" src="https://via.placeholder.com/500"/>
			</a>
      <Card.Body>
        <Card.Title>Name</Card.Title>
        <hr />
        <Card.Text className="pt-2">
          <Row>
            <Col>
              <strong>
                <p>Bottler:</p>
              </strong>
              <strong>
                <p>Age:</p>
              </strong>
            </Col>
            <Col>
              <strong>
                <p>APV:</p>
              </strong>
              <strong>
                <p>Rating:</p>
              </strong>
            </Col>
          </Row>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default BourbonCard;
