import { useState } from "react";
import {addMessageToBlockchain} from "../utils/translationUtils";

const NewMessageInput = () => {
	const [newMessage, setNewMessage] = useState("");

	return (
		<div>
			<input
				type={"text"}
				value={newMessage}
				onChange={(e) => setNewMessage(e.target.value)}
			/>
			<button onClick={() => addMessageToBlockchain(newMessage)}>Add a message</button>
		</div>
	);
};

export default NewMessageInput;