import { useState, useTransition } from "react";

async function updateName() {
	await new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, 2000);
	});
	console.log("Name updated!");
}

function App() {
	const [error, setError] = useState(null);
	const [isPending, setTransition] = useTransition();
	const [success, setSuccess] = useState(false);

	const handleSubmit = (formData) => {
		console.log(formData.get("name"));

		setTransition(async () => {
			const error = await updateName(formData.get("name"));
			if (error) {
				setError(error);
				return;
			}
			setSuccess(true);
		});
	};

	function showSuccess() {
		return <div className="alert alert-success mb-3">Form submited!</div>;
	}

	return (
		<>
			<h2 className="fs-3 mb-5">
				Action функция
				<small className="fw-lighter"> и атрибут action</small>
			</h2>
			<form action={handleSubmit} className="card shadow p-3">
				{success && showSuccess()}
				<label className="form-label">Enter name</label>
				<input name="name" className="form-control mb-3" />
				<button className="btn btn-dark" disabled={isPending}>
					Update
				</button>
				{error && <p>{error}</p>}
			</form>
		</>
	);
}

export default App;
