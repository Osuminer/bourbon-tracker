import { Card, ListGroup, ListGroupItem } from "react-bootstrap"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useEffect, useState } from "react";

import TagComponent from "../TagComponent/TagComponent";
import BourbonLabelComponent from "./BourbonLabelComponent";
import WishlistCollectionButtons from "./WishlistCollectionButtons"

import './BourbonCardComponent.css'

const BourbonCardComponent = ({ whisky, userId }) => {
	const [show, setShow] = useState(false)

	useEffect(() => {
		setShow(true)
	}, [])


	// Replace single quotes with double quotes and remove square brackets
	const cleanString = whisky.Tags[0].replace(/[[\]'"]/g, '').split(',').map(tag => `"${tag.trim()}"`).join(', ');

	// Parse the string as JSON to obtain the array
	const tagsArray = JSON.parse(`[${cleanString}]`);

	return (
		<Card className={`main-card mx-auto shadow ${show ? 'fade-in' : ''}`}>
			<TransformWrapper>
				<TransformComponent>
					<Card.Img src={whisky.ImageURL}></Card.Img>
				</TransformComponent>
			</TransformWrapper>
			<ListGroup variant="flush">
				<ListGroupItem>
					{tagsArray.map((tag, index) => (
						<TagComponent tag={tag} key={index} />
					))}
				</ListGroupItem>

				<BourbonLabelComponent whisky={whisky} />
				{(userId !== '0' && userId) && (
					<ListGroupItem>
						<WishlistCollectionButtons whisky={whisky} />
					</ListGroupItem>
				)}
			</ListGroup>
		</Card>
	)
}

export default BourbonCardComponent