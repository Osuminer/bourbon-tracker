import { useEffect, useState } from "react";
import { Dropdown, DropdownButton, DropdownHeader, Form } from "react-bootstrap";

const UserDropdown = ({ currentUserId }) => {
	const [userList, setUserList] = useState([])
	const [title, setTitle] = useState('Select User');
	const [filterValue, setFilterValue] = useState('');

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await fetch(`https://api.cstasnet.com/api/users`);
				const data = await response.json();
				data.push({ id: 0, username: 'No User' })
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

			console.log(userList)

			if (user) {
				setTitle(user.username);
			} else {
				// Keep the current title if user is not found
				setTitle((prevTitle) => prevTitle || "Select User");
			}
		}
	}, [userList, currentUserId]);


	return (
		<DropdownButton menuVariant="dark" variant="dark" title={title} style={{ paddingRight: '15px' }}>
			<DropdownHeader>Select Account</DropdownHeader>
			<Form.Control
				autoFocus
				className="mx-3 my-2 w-auto"
				placeholder="Type to filter..."
				onChange={(e) => setFilterValue(e.target.value)}
				value={filterValue}
			/>
			{userList.map((user) => {

				const redirectURL = `?u=${user.id}`

				return (
					<Dropdown.Item href={redirectURL} key={user.id} active={currentUserId === user.id} >{user.username}</Dropdown.Item>
				)
			}).filter((child) =>
				!filterValue || child.props.children.toLowerCase().startsWith(filterValue.toLowerCase()),
			)}
		</DropdownButton>
	);
}

export default UserDropdown