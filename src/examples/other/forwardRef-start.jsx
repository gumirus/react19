import { useRef, forwardRef } from "react";

const Input = forwardRef((props, ref) => {
	return (
		<input
			ref={ref}
			type="text"
			name="message"
			placeholder="Hello!"
			className="form-control mb-3"
		/>
	);
});

function App() {
	const inputRef = useRef(null);

	return (
		<>
			<h2 className="fs-3 mb-5">
				useRef() <small className="fw-lighter">ref как property</small>
			</h2>
			<Input ref={inputRef} />
			<button
				onClick={() => console.log(inputRef)}
				type="submit"
				className="btn btn-dark"
			>
				Send
			</button>
		</>
	);
}

export default App;
