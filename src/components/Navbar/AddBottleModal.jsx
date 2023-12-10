import { Form, Button, Modal, FloatingLabel, Row, Col, Nav, NavItem } from 'react-bootstrap';

function AddBottleModal({ show, handleModalClose }) {
  return (
    <Modal show={show} onHide={handleModalClose} dialogClassName="modal-xl">
      <Modal.Header closeButton>
        <Modal.Title>Add a Bottle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Nav variant='tabs' defaultActiveKey="#info">
					<Nav.Item>
						<Nav.Link href='#info'>Info</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link href='#review'>Review</Nav.Link>
					</Nav.Item>
				</Nav>
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
