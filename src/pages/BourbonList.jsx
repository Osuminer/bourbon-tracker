import React, { useEffect, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

import BourbonCard from '../components/BourbonCard/BourbonCard';
import PaginationComponent from '../components/PaginationComponent/PaginationComponent'

const BourbonList = ({ whiskies }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const itemsPerPage = 24

  const userId = queryParams.get('u')
  const searchParam = queryParams.get('q')
  let currentPage = queryParams.get('p')
  currentPage = currentPage ? parseInt(currentPage) : 0;

  const [totalPages, setTotalPages] = useState(0)

  const apiURL = 'https://api.cstasnet.com'


  useEffect(() => {
    // Function to fetch total pages from
    const fetchTotalPages = async () => {
      try {
        let url = `${apiURL}/api/whiskies/count`

        if (searchParam) {
          url += `?q=${searchParam}`;
        }

        const response = await fetch(url)
        const data = await response.json();
        setTotalPages(Math.ceil(data / itemsPerPage));
      } catch (error) {
        console.error('Error fetching total pages:', error);
      }
    };

    fetchTotalPages();
  }, [searchParam, totalPages]);

  // Handles the url's for the change page buttons based on what queries were provided
  const handlePageClick = (action) => {
    let url = '/?';


    if (searchParam) {
      url += `q=${searchParam}&`;
    }

    switch (action) {
      case 0:
        url += `p=${0}&`;
        break;
      case 1:
        url += `p=${parseInt(currentPage) - 1}&`;
        break;
      case 2:
        url += `p=${parseInt(currentPage) + 1}&`;
        break;
      case 3:
        url += `p=${totalPages - 1}&`;
        break;
      default:
        break;
    }

    if (userId) {
      url += `u=${userId}`;
    }


    navigate(url);
  };


  return (
    <Container>
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageClick={handlePageClick}
        style={{ justifyContent: "center", marginTop: "40px" }} />

      <Row>
        {whiskies.map((whisky) => (
          <Col key={whisky._id}>
            <BourbonCard whisky={whisky} userId={userId} />
          </Col>
        ))}
      </Row>

      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageClick={handlePageClick}
        style={{ justifyContent: "center", marginBottom: "40px" }} />

    </Container>
  );
};

export default BourbonList;
