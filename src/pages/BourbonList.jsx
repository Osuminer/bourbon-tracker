import React from 'react';
import { Row, Col } from 'react-bootstrap';
import BourbonCard from '../components/BourbonCard';

const BourbonList = ({ whiskies }) => {
  return (
    <Row>
      {whiskies.map((whisky) => (
        <Col key={whisky._id}>
          <BourbonCard whisky={whisky} />
        </Col>
      ))}
    </Row>
  );
};

export default BourbonList;
