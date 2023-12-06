import { useState } from "react";
import { ButtonGroup, Button, Spinner } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const WishlistCollectionButtons = ({ whisky }) => {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const userId = queryParams.get("u");

	const [isInWishlist, setIsInWishlist] = useState(whisky.inWishlist);
	const [isInCollection, setIsInCollection] = useState(whisky.inCollection);
	const [wishlistLoading, setWishlistLoading] = useState(false);
	const [collectionLoading, setCollectionLoading] = useState(false);

	// const baseUrl = 'http://localhost:5000'
	const baseUrl = 'https://api.cstasnet.com'
	// const baseUrl = 'http://192.24.140.223:5000'


	const handleWishlistToggleButton = async () => {
		try {
			setWishlistLoading(true);

			const response = await fetch(`${baseUrl}/api/wishlist/toggle/${whisky._id}/${userId}`)

			if (response.ok) {
				setIsInWishlist((prevState) => !prevState);
			} else {
				console.error("Failed to update wishlist");
			}
		} catch (error) {
			console.error("Error updating wishlist:", error);
		} finally {
			setWishlistLoading(false);
		}
	};

	const handleCollectionToggleButton = async () => {
		try {
			setCollectionLoading(true);

			const response = await fetch(`${baseUrl}/api/collection/toggle/${whisky._id}/${userId}`)

			if (response.ok) {
				setIsInCollection((prevState) => !prevState);
			} else {
				console.error("Failed to update collection");
			}
		} catch (error) {
			console.error("Error updating collection:", error);
		} finally {
			setCollectionLoading(false);
		}
	};

	return (
		<ButtonGroup className="d-flex justify-content-center">
			<Button
				variant={isInWishlist ? "danger" : "dark"}
				onClick={wishlistLoading ? null : handleWishlistToggleButton}
				style={{ width: "9rem" }}
			>
				{wishlistLoading ? (
					<Spinner animation="border" size="sm" role="status" />
				) : (
					<span>
						<i
							className={`bi ${isInWishlist ? "bi-dash-lg" : "bi-plus-lg"
								}`}
							style={{ paddingRight: "1rem" }}
						></i>
						{isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
					</span>
				)}
			</Button>
			<Button
				variant={isInCollection ? "danger" : "dark"}
				onClick={collectionLoading ? null : handleCollectionToggleButton}
				style={{ width: "9rem" }}
			>
				{collectionLoading ? (
					<Spinner animation="border" size="sm" role="status" />
				) : (
					<span>
						<i
							className={`bi ${isInCollection ? "bi-dash-lg" : "bi-plus-lg"
								}`}
							style={{ paddingRight: "1rem" }}
						></i>
						{isInCollection
							? "Remove from Collection"
							: "Add to Collection"}
					</span>
				)}
			</Button>
		</ButtonGroup>
	);
};

export default WishlistCollectionButtons;
