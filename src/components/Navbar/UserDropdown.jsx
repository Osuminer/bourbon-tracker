import { useEffect, useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

const UserDropdown = () => {
	const [userList, setUserList] = useState([])

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


	return (
		<DropdownButton title="Select User" style={{ paddingRight: '15px' }}>
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