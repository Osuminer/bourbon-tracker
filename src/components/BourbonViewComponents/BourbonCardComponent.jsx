import { Card, ListGroup, ListGroupItem } from "react-bootstrap"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import TagComponent from "../TagComponent/TagComponent";
import BourbonLabelComponent from "./BourbonLabelComponent";

const BourbonCardComponent = ({whisky}) => {

	// Replace single quotes with double quotes and remove square brackets
	const cleanString = whisky.Tags[0].replace(/[[\]'"]/g, '').split(',').map(tag => `"${tag.trim()}"`).join(', ');

	// Parse the string as JSON to obtain the array
	const tagsArray = JSON.parse(`[${cleanString}]`);

	return (
		<Card className="main-card mx-auto">
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
				</ListGroup>
			</Card>
	)
}

export default BourbonCardComponent