import { useState } from "react"
import { ButtonGroup, Button } from "react-bootstrap"

const WishlistCollectionButtons = ({whisky}) => {

	const [isInWishlist, setIsInWishlist] = useState(whisky.inWishlist)
	const [isInCollection, setIsInCollection] = useState(whisky.inCollection)


	const handleWishlistToggleButton = () => {
		setIsInWishlist((prevState) => !prevState)
	}

	const handleCollectionToggleButton = () => {
		setIsInCollection((prevState) => !prevState)
	}


	return (
		<ButtonGroup className="d-flex justify-content-center">
					<Button
						variant={isInWishlist ? 'danger' : 'dark'}
						onClick={handleWishlistToggleButton}
						style={{width: "9rem"}}
					>
						<span>
							<i className={`bi ${isInWishlist ? 'bi-dash-lg' : 'bi-plus-lg'}`} style={{ paddingRight: '1rem' }}></i>
							{isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
						</span>
					</Button>
					<Button
						variant={isInCollection ? 'danger' : 'dark'}
						onClick={handleCollectionToggleButton}
						style={{width: "9rem"}}
					>
						<span>
							<i className={`bi ${isInCollection ? 'bi-dash-lg' : 'bi-plus-lg'}`} style={{ paddingRight: '1rem' }}></i>
							{isInCollection ? 'Remove from Collection' : 'Add to Collection'}
						</span>
					</Button>
				</ButtonGroup>
	)
}

export default WishlistCollectionButtons