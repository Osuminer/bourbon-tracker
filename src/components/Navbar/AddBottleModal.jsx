import { Form, Button, Modal, FloatingLabel } from 'react-bootstrap';

function AddBottleModal({ show, handleModalClose }) {
	return (
		<Modal show={show} onHide={handleModalClose}>
			<Modal.Header closeButton>
				<Modal.Title>Add a Bottle</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<FloatingLabel
						controlId="floatingInput"
						label="Bottle Name"
						className="mb-3"
					>
						<Form.Control type="text" placeholder="My Bottle" />
					</FloatingLabel>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="dark" onClick={handleModalClose}>
					Close
				</Button>
				<Button variant="primary" onClick={handleModalClose}>
					Save Changes
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default AddBottleModal;