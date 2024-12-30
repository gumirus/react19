import { useActionState } from "react";

async function increment(previousState, formData) {
	return previousState + 1;
}

export default function App({}) {
	const [state, formAction] = useActionState(increment, 0);
	return (
		<>
			<h2 className="fs-3 mb-5">
				useActionState
				<small className="fw-lighter"> пример со счетчиком</small>
			</h2>
			<form>
				<div className="fs-3 mb-2">{state}</div>
				<button formAction={formAction} className="btn btn-dark">
					Increment
				</button>
			</form>
		</>
	);
}
