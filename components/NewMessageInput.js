import { useState } from "react";
import {addMessageToBlockchain} from "../utils/translationUtils";

import styles from "./newMessageInput.module.scss";

const NewMessageInput = () => {
	const [newMessage, setNewMessage] = useState("");

	return (
		<div className={styles.newMessageInputContainer}>
			<input
				className={styles.newMessageInput}
				type={"text"}
				value={newMessage}
				onChange={(e) => setNewMessage(e.target.value)}
			/>
			<button onClick={() => {
				addMessageToBlockchain(newMessage);
			}}>Add a message</button>
		</div>
	);
};

export default NewMessageInput;