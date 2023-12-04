import { useState, useEffect } from "react";
import {
	Card,
	Col,
	Container,
	ListGroup,
	ListGroupItem,
	Row,
	Accordion
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import TagComponent from '../components/TagComponent'
import "./BourbonView.scss"


const BourbonView = () => {
	const { id } = useParams()
	const [whisky, setWhisky] = useState(null);

	useEffect(() => {
		// Function to fetch whisky by id
		const fetchWhisky = async () => {
			try {
				const response = await fetch(`https://api.cstasnet.com/api/whiskies/${id}`);
				const data = await response.json();
				setWhisky(data)
			} catch (error) {
				console.error('Error fetching whisky:', error);
			}
		};

		fetchWhisky();
	}, [id]);


	if (whisky === null) {
		return <div>Loading...</div>;
	}


	// Replace single quotes with double quotes and remove square brackets
	const cleanString = whisky.Tags[0].replace(/[[\]'"]/g, '').split(',').map(tag => `"${tag.trim()}"`).join(', ');

	// Parse the string as JSON to obtain the array
	const tagsArray = JSON.parse(`[${cleanString}]`);

	// Render the whisky details
	return (
		<Container style={{ paddingBottom: '200px' }}>
			<h1 className="whisky-name">{whisky.Name}</h1>
			<Card className="main-card mx-auto">
				<TransformWrapper>
					<TransformComponent>
						<Card.Img src={whisky.ImageURL}></Card.Img>
					</TransformComponent>
				</TransformWrapper>
				<ListGroup variant="flush">
					<ListGroupItem>
						{tagsArray.map((tag, index) => (
							<TagComponent tag={tag} key={index}/>
						))}
					</ListGroupItem>
					<ListGroupItem>
						<Row>
							<Col sm={6} md={3} className="gy-2"><strong>Type:</strong></Col>
							<Col sm={6} md={3} className="gy-2">{whisky.Type}</Col>
							<Col sm={6} md={3} className="gy-2"><strong>Age:</strong></Col>
							<Col sm={6} md={3} className="gy-2">{whisky.Age}</Col>
						</Row>
						<Row>
							<Col sm={6} md={3} className="gy-2"><strong>Distiller:</strong></Col>
							<Col sm={6} md={3} className="gy-2">{whisky.Distiller}</Col>
							<Col sm={6} md={3} className="gy-2"><strong>Bottler:</strong></Col>
							<Col sm={6} md={3} className="gy-2">{whisky.Bottler}</Col>
						</Row>
						<Row>
							<Col sm={6} md={3} className="gy-2"><strong>ABV:</strong></Col>
							<Col sm={6} md={3} className="gy-2">{whisky.ABV}</Col>
							<Col sm={6} md={3} className="gy-2"><strong>Price:</strong></Col>
							<Col sm={6} md={3} className="gy-2">{whisky.Price}</Col>
						</Row>
						<Row>
							<Col sm={6} md={3} className="gy-2"><strong>Rating</strong></Col>
							<Col sm={6} md={3} className="gy-2">{whisky.Rating}</Col>
							<Col sm={6} md={3} className="gy-2"><strong>House Score:</strong></Col>
							<Col sm={6} md={3} className="gy-2">{whisky['House Score']}</Col>
						</Row>
					</ListGroupItem>
				</ListGroup>
			</Card>

			<Accordion className="tasting" defaultActiveKey="0">
				<Accordion.Item eventKey="0">
					<Accordion.Header>Intro</Accordion.Header>
					<Accordion.Body>{whisky.Intro}</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="1">
					<Accordion.Header>Nose</Accordion.Header>
					<Accordion.Body>{whisky.Nose}</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="2">
					<Accordion.Header>Taste</Accordion.Header>
					<Accordion.Body>{whisky.Taste}</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="3">
					<Accordion.Header>Finish</Accordion.Header>
					<Accordion.Body>{whisky.Finish}</Accordion.Body>
				</Accordion.Item>
			</Accordion>


		</Container>
	);
};

export default BourbonView;
