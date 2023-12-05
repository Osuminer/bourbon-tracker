import { useEffect, useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

const UserDropdown = ({currentUserId}) => {
	const [userList, setUserList] = useState([])
	const [title, setTitle] = useState('Select User');

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await fetch(`https://api.cstasnet.com/api/users`);
				const data = await response.json();
				setUserList(data)
			} catch (error) {
				console.error('Error fetching uesrs:', error);
			}
		};

		fetchUsers();

	}, [])

	useEffect(() => {
		if (currentUserId) {
			// Find the user in the userList with the matching id
			const user = userList.find((user) => user.id === currentUserId);
	
			if (user) {
				setTitle(user.username);
			} else {
				// Keep the current title if user is not found
				setTitle((prevTitle) => prevTitle || "Select User");
			}
		}
	}, [userList, currentUserId]);
	

	return (
		<DropdownButton variant="dark" title={title} style={{ paddingRight: '15px' }}>
			{userList.map((user) => {

				const redirectURL = `/${user.id}`

				return (
					<Dropdown.Item href={redirectURL} key={user.id}>{user.username}</Dropdown.Item>
				)
			})}
		</DropdownButton>
	);
}

export default UserDropdown