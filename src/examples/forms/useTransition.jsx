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
	const [name, setName] = useState("");
	const [error, setError] = useState(null);

	const [isPending, setTransition] = useTransition();

	const [success, setSuccess] = useState(false);

	const handleSubmit = () => {
		setTransition(async () => {
			const error = await updateName(name);
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
				useTransition <small className="fw-lighter">состояние ожидания</small>
			</h2>
			<div className="card shadow p-3">
				{success && showSuccess()}
				<label className="form-label">Enter name</label>
				<input
					className="form-control mb-3"
					value={name}
					onChange={(event) => setName(event.target.value)}
				/>
				<button
					className="btn btn-dark"
					onClick={handleSubmit}
					disabled={isPending}
				>
					Update
				</button>
				{error && <p>{error}</p>}
			</div>
		</>
	);
}

export default App;
