import { useState, useOptimistic } from "react";

async function updateName(name) {
	console.log("updateName name:", name);
	console.log("Waiting 3 sec...");
	await new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, 3000);
	});
	console.log("updateName COMPLETE");
	return name;
}

function App() {
	const [name, setName] = useState("John");

	const [optimisticState, setOptimisticState] = useOptimistic(name);

	async function handleSubmit(formData) {
		setOptimisticState(formData.get("name"));
		const newName = await updateName(formData.get("name"));
		setName(newName);
	}

	return (
		<>
			<h2 className="fs-3 mb-5">
				useOptimistic()
			</h2>
			<form action={handleSubmit} className="card shadow p-3">
				<p className="fs-3">Current name: {optimisticState}</p>
				<label className="form-label">Enter name</label>
				<input name="name" className="form-control mb-3" />
				<button
					className="btn btn-dark"
					disabled={name !== optimisticState}
				>
					Update
				</button>
			</form>
		</>
	);
}

export default App;
