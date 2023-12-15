import { Accordion } from "react-bootstrap"

const BourbonReviewComponent = ({whisky}) => {
	return (
		<Accordion className="tasting shadow" defaultActiveKey="0">
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
	)
}

export default BourbonReviewComponent