import { useOptimistic, useState, useRef } from "react";

//...

function Thread({ messages, sendMessage }) {

	async function formAction(formData) {
		addOptimisticMessage(formData.get("message"));
		await sendMessage(formData);
	}

	const [optimisticMessages, addOptimisticMessage] = useOptimistic(
		messages,
		(state, newMessage) => [
			...state,
			{
				text: newMessage,
				sending: true,
			},
		]
	);

	return (
		<>
			{optimisticMessages.map((message, index) => (
				<div key={index}>
					{message.text}
					{!!message.sending && <small> (Sending...)</small>}
				</div>
			))}
			<form action={formAction}>
				<input
					type="text"
					name="message"
					placeholder="Hello!"
				/>
				<button type="submit">
					Send
				</button>
			</form>
		</>
	);
}

export default function App() {
	const [messages, setMessages] = useState([
		{ text: "Hello there!", sending: false, key: 1 },
	]);

	async function sendMessage(formData) {
		const sentMessage = await deliverMessage(formData.get("message"));
		setMessages((messages) => [...messages, { text: sentMessage }]);
	}

	return <Thread messages={messages} sendMessage={sendMessage} />;
}
