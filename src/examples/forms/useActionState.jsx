import { useState, useActionState } from 'react';

async function updateName(name) {
	await new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, 2000);
	});
	console.log(name);
	console.log('Name updated!');

	return {
		success: true,
		errorMessage: 'Some error text',
		successMessage: 'Complete successfully!',
	};
}

function App() {
	const [formState, submitAction, isPending] = useActionState(
		handleSubmit,
		null
	);

	async function handleSubmit(prevState, formData) {
		return await updateName(formData.get('name'));
	}

	function showSuccess(message) {
		return <div className="alert alert-success mb-3">{message}</div>;
	}

	return (
		<>
			<h2 className="fs-3 mb-5">
				useActionState
				<small className="fw-lighter"> пример с формой</small>
			</h2>
			<form action={submitAction} className="card shadow p-3">
				{formState?.success && showSuccess(formState.successMessage)}
				<label className="form-label">Enter name</label>
				<input name="name" className="form-control mb-3" />
				<button className="btn btn-dark" disabled={isPending}>
					Update
				</button>
				{formState?.success === false && (
					<p>{formState.errorMessage}</p>
				)}
			</form>
		</>
	);
}

export default App;
