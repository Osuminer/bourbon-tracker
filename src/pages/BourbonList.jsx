import React, { useEffect, useState } from 'react';
import { Row, Col, Pagination, Container } from 'react-bootstrap';
import BourbonCard from '../components/BourbonCard';
import { useNavigate, useLocation } from 'react-router-dom';

const BourbonList = ({ whiskies }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const itemsPerPage = 24
  const searchParam = queryParams.get('q')
  let currentPage = queryParams.get('p')
  currentPage = currentPage ? parseInt(currentPage) : 0;

  const [totalPages, setTotalPages] = useState(0)


  useEffect(() => {
    // Function to fetch total pages from your API
    const fetchTotalPages = async () => {
      try {
        let url

        if (searchParam) {
          url = `localhost:5000/api/whiskies/count?q=${searchParam}`;
        } else {
          url = `localhost:5000/api/whiskies/count`;
        }
        
        console.log(url)

        const response = await fetch(url)
        const data = await response.json();
        setTotalPages(data / itemsPerPage);
        console.log(totalPages)
      } catch (error) {
        console.error('Error fetching total pages:', error);
      }
    };

    // Fetch total pages when the component mounts or when the searchParam changes
    fetchTotalPages();
  }, [searchParam, totalPages]);



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
    } else if (action === 3) {
      if (searchParam) {
        navigate(`/?q=${searchParam}&p=${totalPages - 1}`)
      } else {
        navigate(`/?p=${totalPages - 1}`)
      }
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
