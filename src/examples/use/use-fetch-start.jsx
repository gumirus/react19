import { useEffect, useState } from "react";

const url = "https://jsonplaceholder.typicode.com/users";

function App() {
	const [users, setUsers] = useState(null);

	useEffect(() => {
		async function getUsers() {
			const res = await fetch(url);
			const data = await res.json();
			setUsers(data);
		}
		getUsers();
	}, []);

	return (
		<>
			<h2 className="fs-3 mb-5">
				use() <small className="fw-lighter">fetching data</small>
			</h2>
			<ul>
			{users && users.map((user, index) => <li key={index}>{user.name}</li>)}
			</ul>
		</>
	);
}

export default App;
