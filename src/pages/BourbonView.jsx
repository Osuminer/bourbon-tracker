import { useState, useEffect } from "react";
import { Container, Spinner} from "react-bootstrap";
import { useParams } from "react-router-dom";

import BourbonReviewComponent from "../components/BourbonViewComponents/BourbonReviewComponent";
import BourbonCardComponent from "../components/BourbonViewComponents/BourbonCardComponent";

import "./BourbonView.scss"


const BourbonView = () => {
	const { id, userId } = useParams()
	const [whisky, setWhisky] = useState(null);

	useEffect(() => {
		// Function to fetch whisky by id
		const fetchWhisky = async () => {
			try {
				const response = await fetch(`https://api.cstasnet.com/api/whiskies/${id}/${userId}`);
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


	// Render the whisky details
	return (
		<Container style={{ paddingBottom: '200px' }}>
			<h1 className="whisky-name">{whisky.Name}</h1>
			<BourbonCardComponent whisky={whisky} />

			<BourbonReviewComponent whisky={whisky} />

		</Container>
	);
};

export default BourbonView;
