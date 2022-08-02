import { useState } from "react";
import {addMessageToBlockchain} from "../utils/translationUtils";

import styles from "./newMessageInput.module.scss";

const NewMessageInput = () => {
	const [newMessage, setNewMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	return (
		<div className={styles.newMessageInputContainer}>
			<input
				className={styles.newMessageInput}
				type={"text"}
				value={newMessage}
				onChange={(e) => setNewMessage(e.target.value)}
			/>
			<button onClick={async () => {
				setIsLoading(true);
				await addMessageToBlockchain(newMessage);
				setIsLoading(false);
			}}>Add a message</button>
			<div class={`ui ${isLoading ? "active" : ""} inline loader`}></div>
		</div>
	);
};

export default NewMessageInput;