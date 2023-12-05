import React, { useEffect, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import BourbonCard from '../components/BourbonCard/BourbonCard';
import PaginationComponent from '../components/PaginationComponent/PaginationComponent'

const BourbonList = ({ whiskies }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const { userId } = useParams()

  const itemsPerPage = 24
  const searchParam = queryParams.get('q')
  let currentPage = queryParams.get('p')
  currentPage = currentPage ? parseInt(currentPage) : 0;

  const [totalPages, setTotalPages] = useState(0)

  const apiURL = 'https://api.cstasnet.com'


  useEffect(() => {
    // Function to fetch total pages from your API
    const fetchTotalPages = async () => {
      try {
        let url

        if (searchParam) {
          url = `${apiURL}/api/whiskies/count?q=${searchParam}`;
        } else {
          url = `${apiURL}/api/whiskies/count`;
        }

        const response = await fetch(url)
        const data = await response.json();
        setTotalPages(Math.ceil(data / itemsPerPage));
      } catch (error) {
        console.error('Error fetching total pages:', error);
      }
    };

    // Fetch total pages when the component mounts or when the searchParam changes
    fetchTotalPages();
  }, [searchParam, totalPages]);


  const handlePageClick = (action) => {
    let url = '/';
  
    if (userId) {
      url += `${userId}/`;
    }
  
    if (searchParam) {
      url += `?q=${searchParam}&`;
    } else {
      url += '?';
    }
  
    switch (action) {
      case 0:
        url += `p=${0}`;
        break;
      case 1:
        url += `p=${parseInt(currentPage) - 1}`;
        break;
      case 2:
        url += `p=${parseInt(currentPage) + 1}`;
        break;
      case 3:
        url += `p=${totalPages - 1}`;
        break;
      default:
        break;
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
