// import React, { useState } from "react";
import {
	//   Navbar,
	//   Nav,
	//   NavDropdown,
	//   Form,
	//   Button,
	//   InputGroup,
} from "react-bootstrap";
// import "./Navbar.css";
import { useParams } from "react-router-dom";

const BourbonView = () => {
	const { id } = useParams()

	return (
		<div>
			<h1>Whisky Details Page</h1>
			<p>Whisky ID: {id}</p>
			{/* Add your content for whisky details */}
		</div>
	);
};

export default BourbonView;
