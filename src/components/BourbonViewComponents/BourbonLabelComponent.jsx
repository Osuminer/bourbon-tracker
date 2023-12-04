import { ListGroupItem, Row, Col } from "react-bootstrap"

const BourbonLabelComponent = ({ whisky }) => {
	return (
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
	)
}

export default BourbonLabelComponent