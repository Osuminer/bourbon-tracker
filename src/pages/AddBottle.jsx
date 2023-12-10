import React, { useState } from "react"
import { Container, Form, FloatingLabel, Row, Col, Image, Button, InputGroup } from "react-bootstrap"

import "./AddBottle.css"

const AddBottle = () => {
	const [url, setUrl] = useState("")
	const [image, setImage] = useState("")

	const handleSearch = () => {
		setImage(url)
	}

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();

			handleSearch()
		}
	}

	return (
		<Container>
			<h1>Add Bottle</h1>

			<Form className="pb-5 needs-validation">

				{/* Row 1 */}
				<Row className="mt-4">
					<Form.Group as={Col} className="col-lg-7">
						<Form.Label>Bottle Name</Form.Label>
						<Form.Control placeholder="Enter bottle name..."></Form.Control>
					</Form.Group>
					<Form.Group as={Col}>
						<Form.Label>Bottle Type</Form.Label>
						<Form.Control placeholder="e.g. Bourbon, Gin"></Form.Control>
					</Form.Group>
					<Form.Group as={Col}>
						<Form.Label>Age</Form.Label>
						<Form.Control placeholder="e.g. 10 Years, 3 Years"></Form.Control>
					</Form.Group>
				</Row>

				{/* Row 2 */}
				<Row className="mt-3">
					<Form.Group as={Col} className="col-sm-12">
						<span>
							<Form.Label>Tags</Form.Label>
							<i class="bi bi-info-circle-fill mx-2"></i>
						</span>
						<Form.Control placeholder="e.g. Bourbon, Woodford Reserve, Eagle Rare"></Form.Control>
					</Form.Group>
				</Row>

				{/* Row 3 */}
				<Row className="mt-3">
					<Form.Group as={Col}>
						<Form.Label>Distiller</Form.Label>
						<Form.Control placeholder="Enter Distiller..."></Form.Control>
					</Form.Group>
					<Form.Group as={Col}>
						<Form.Label>Bottler</Form.Label>
						<Form.Control placeholder="Enter bottler..."></Form.Control>
					</Form.Group>
					<Form.Group as={Col} className="col-sm-2">
						<Form.Label>ABV</Form.Label>
						<Form.Control placeholder="Enter ABV..."></Form.Control>
					</Form.Group>
					<Form.Group as={Col} className="col-sm-2">
						<Form.Label>Rating</Form.Label>
						<Form.Control placeholder="Enter rating /100..."></Form.Control>
					</Form.Group>
				</Row>

				{/* Row 4 */}
				<Row className="mt-3">
					<Form.Group as={Col}>
						<Form.Label>Intro</Form.Label>
						<Form.Control as="textarea" placeholder="Enter intro..."></Form.Control>
					</Form.Group>
					<Form.Group as={Col}>
						<Form.Label>Nose</Form.Label>
						<Form.Control as="textarea" placeholder="Enter nose..."></Form.Control>
					</Form.Group>
					<Form.Group as={Col}>
						<Form.Label>Taste</Form.Label>
						<Form.Control as="textarea" placeholder="Enter tase..."></Form.Control>
					</Form.Group>
					<Form.Group as={Col}>
						<Form.Label>Finish</Form.Label>
						<Form.Control as="textarea" placeholder="Enter finish..."></Form.Control>
					</Form.Group>
				</Row>

				<hr />

				<InputGroup className="mt-3">
					<FloatingLabel label="Image URL">
						<Form.Control type="url" placeholder="" onChange={(e) => setUrl(e.target.value)} onKeyDown={handleKeyDown}></Form.Control>
					</FloatingLabel>
					<Button className="px-4" onClick={() => handleSearch(image)}>
						<i className="bi bi-search"></i>
					</Button>
				</InputGroup>
				<Image rounded src={image} className="bourbon-image shadow d-block mx-auto my-5" />

				<Row>
					<Button type="submit">Submit</Button>
				</Row>

			</Form>
			)

		</Container>
	)
}

export default AddBottle