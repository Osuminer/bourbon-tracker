import React, { useEffect, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

import BourbonCard from '../components/BourbonCard/BourbonCard';
import PaginationComponent from '../components/PaginationComponent/PaginationComponent'


const MyWishlist = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const queryParams = new URLSearchParams(location.search)

	const itemsPerPage = 24

	const userId = queryParams.get('u')
	let currentPage = queryParams.get('p')
	currentPage = currentPage ? parseInt(currentPage) : 0;

	const [totalPages, setTotalPages] = useState(0)
	const [whiskies, setWhiskies] = useState([])


	const apiURL = 'https://api.cstasnet.com'


	useEffect(() => {
		const fetchWishlistWiskies = async () => {
			try {
				if (userId !== '0' && userId) {
					const response = await fetch(`${apiURL}/api/wishlist/${userId}`)
					const data = await response.json()

					setWhiskies(data)
				}
			} catch (error) {
				console.error('Error fetching total pages:', error);
			}
		}

		// Function to fetch total pages from
		const fetchTotalPages = async () => {
			console.log(userId)

			try {
				if (userId !== '0' && userId) {
					const url = `${apiURL}/api/wishlist/count/${userId}`

					const response = await fetch(url)
					const data = await response.json();
					setTotalPages(Math.ceil(data / itemsPerPage));
				}
			} catch (error) {
				console.error('Error fetching total pages:', error);
			}
		};

		fetchWishlistWiskies()
		fetchTotalPages();
	}, [totalPages, userId]);

	// Handles the url's for the change page buttons based on what queries were provided
	const handlePageClick = (action) => {
		let url = '/wishlist?';

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
			<h1>My Wishlist</h1>

			{totalPages !== 0 && <PaginationComponent
				currentPage={currentPage}
				totalPages={totalPages}
				handlePageClick={handlePageClick}
				style={{ justifyContent: "center", marginTop: "40px" }} />}

			
			{totalPages === 0 && <h4 style={{textAlign: 'center'}}>Your wishlist is empty...</h4>}

			<Row>
				{whiskies.map((whisky) => (
					<Col key={whisky._id}>
						<BourbonCard whisky={whisky} userId={userId} />
					</Col>
				))}
			</Row>

			{totalPages !== 0 && <PaginationComponent
				currentPage={currentPage}
				totalPages={totalPages}
				handlePageClick={handlePageClick}
				style={{ justifyContent: "center", marginBottom: "40px" }} />}

		</Container>
	);
}

export default MyWishlist