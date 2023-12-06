import { useState, useEffect } from "react";
import { Container, Spinner} from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";

import BourbonReviewComponent from "../components/BourbonViewComponents/BourbonReviewComponent";
import BourbonCardComponent from "../components/BourbonViewComponents/BourbonCardComponent";

import "./BourbonView.scss"


const BourbonView = () => {
	const location = useLocation()

	const { id } = useParams()
	const [whisky, setWhisky] = useState(null);
	const userId = new URLSearchParams(location.search).get('u');

	useEffect(() => {
		// Function to fetch whisky by id
		const fetchWhisky = async () => {
			let url;

			if (userId) {
				url = `https://api.cstasnet.com/api/whiskies/${id}/${userId}`
			} else {
				url = `https://api.cstasnet.com/api/whiskies/${id}`
			}

			console.log(url)

			try {
				const response = await fetch(url);
				const data = await response.json();
				setWhisky(data)
			} catch (error) {
				console.error('Error fetching whisky:', error);
			}
		};

		fetchWhisky();
	}, [id, userId]);


	if (whisky === null) {
		return (
			<Spinner animation="border" role="status">
				<span className="visually-hidden">Loading...</span>
			</Spinner>
		);
	}

	// console.log(whisky)

	// Render the whisky details
	return (
		<Container style={{ paddingBottom: '200px' }}>
			<h1 className="whisky-name">{whisky.Name}</h1>
			<BourbonCardComponent whisky={whisky} userId={userId} />

			<BourbonReviewComponent whisky={whisky} />

		</Container>
	);
};

export default BourbonView;
