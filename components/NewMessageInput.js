import { useState } from "react";
import { Message } from "semantic-ui-react";
import {addMessageToBlockchain} from "../utils/translationUtils";

import styles from "./newMessageInput.module.scss";

const NewMessageInput = () => {
	const [newMessage, setNewMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	return (
		<div>
			<div className={styles.newMessageInputContainer}>
				<input
					className={styles.newMessageInput}
					type={"text"}
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
				/>
				<button onClick={async () => {
					setIsLoading(true);
					try {
						await addMessageToBlockchain(newMessage);
					} catch (err) {
						setErrorMessage(err);
					} finally {
						setIsLoading(false);
					}
				}}>Add a message</button>
				<div class={`ui ${isLoading ? "active" : ""} inline loader`}></div>
			</div>
			{errorMessage &&
				<Message
					error
					header={"Error processing request"}
					content={errorMessage}
				/>	
			}
		</div>
	);
};

export default NewMessageInput;