import { Suspense, use } from "react";

/* Получение списка пользоватиелей с  */
const url = "https://jsonplaceholder.typicode.com/users";

// Вот так
// const getUsers = fetch(url).then((res) => res.json());

// Или с задержкой
const getUsers = new Promise((resolve, reject) => {
	fetch(url)
		.then((res) => res.json())
		.then((data) => {
			setTimeout(() => resolve(data), 2000); // Задержка в 2 секунды
		})
		.catch(reject); // Обработка ошибок
});

/*
Suspense работает только для дочерних компонентов, а не для самого компонента, где вызывается use().
Поэтому в компоненте App мы вызываем Suspense. Suspense, будет ожидать загрузки компонентов внутри него, но не родительского. Поэтому use переносим в дочерний компонент ShowUsers, чтобы он был обработан в Suspense
*/
function ShowUsers() {
	let users = use(getUsers);
	return (
		<>
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

function App() {
	return (
		<>
			<h2 className="fs-3 mb-5">
				use() <small className="fw-lighter">fetching data + suspense</small>
			</h2>

			<Suspense fallback={<p>⌛Downloading users...</p>}>
				<ShowUsers />
			</Suspense>
		</>
	);
}

export default App;
