import React from 'react';
import { Row, Col, Pagination, Container } from 'react-bootstrap';
import BourbonCard from '../components/BourbonCard';
import { useNavigate, useLocation } from 'react-router-dom';

const BourbonList = ({ whiskies }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const searchParam = queryParams.get('q')
  const currentPage = queryParams.get('p')

  const handlePageClick = (action) => {
    if (action === 0) {
      if (searchParam) {
        navigate(`/?q=${searchParam}&p=${0}`)
      } else {
        navigate(`/?p=${0}`)
      }
    } else if (action === 1) {
      if (searchParam) {
        navigate(`/?q=${searchParam}&p=${parseInt(currentPage) - 1}`)
      } else {
        navigate(`/?p=${parseInt(currentPage) - 1}`)
      }
    } else if (action === 2) {
      if (searchParam) {
        navigate(`/?q=${searchParam}&p=${parseInt(currentPage) + 1}`)
      } else {
        navigate(`/?p=${parseInt(currentPage) + 1}`)
      }
    } else {

    }


    
  }

  return (
    <Container>
      <Pagination style={{justifyContent: "center", marginTop: "40px"}}>
        <Pagination.First onClick={() => handlePageClick(0)} />
        <Pagination.Prev onClick={() => handlePageClick(1)} />
        <Pagination.Item active>{parseInt(currentPage) + 1}</Pagination.Item>
        <Pagination.Next onClick={() => handlePageClick(2)} />
        <Pagination.Last />
      </Pagination>

      <Row>
        {whiskies.map((whisky) => (
          <Col key={whisky._id}>
            <BourbonCard whisky={whisky} />
          </Col>
        ))}
      </Row>

      <Pagination style={{justifyContent: "center", marginBottom: "40px"}}>
        <Pagination.First onClick={() => handlePageClick(0)} />
        <Pagination.Prev onClick={() => handlePageClick(1)} />
        <Pagination.Item active>{parseInt(currentPage) + 1}</Pagination.Item>
        <Pagination.Next onClick={() => handlePageClick(2)} />
        <Pagination.Last />
      </Pagination>
    </Container>
  );
};

export default BourbonList;
