import { use } from "react";

/* Получение списка пользоватиелей с  */
const url = "https://jsonplaceholder.typicode.com/users";

// Вот так
const getUsers = fetch(url).then((res) => res.json());

function App() {
	let users = use(getUsers);
	return (
		<>
			<h2 className="fs-3 mb-5">
				use() <small className="fw-lighter">fetching data</small>
			</h2>
				<h3 className="fs-3">Users list</h3>
				<ul>
					{users &&
						users.map((user, index) => (
							<li key={index}>{user.name}</li>
						))}
				</ul>
		</>
	);
}

export default App;
