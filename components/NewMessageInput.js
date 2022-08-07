import { useState } from "react";
import { Message, Icon } from "semantic-ui-react";
import {addMessageToBlockchain} from "../utils/translationUtils";

import styles from "./newMessageInput.module.scss";

const NewMessageInput = () => {
	const [newMessage, setNewMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	return (
		<div className={styles.wrapper}>
			<div className={styles.newMessageInputContainer}>
				<input
					className={styles.newMessageInput}
					type={"text"}
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
				/>
				<button onClick={async () => {
					if (newMessage.length === 0) {
						setErrorMessage("The message provided by the user cannot be empty");
						return;
					}
					setIsLoading(true);
					try {
						await addMessageToBlockchain(newMessage);
						window.location.reload(true);
					} catch (err) {
						console.log(err.message);
						setErrorMessage(err.message);
					} finally {
						setIsLoading(false);
					}
				}}>Add a message</button>
				<div class={`ui ${isLoading ? "active" : ""} inline loader`}></div>
			</div>
			{errorMessage &&
				<div className={styles.errorMessageContainer}>
					<Message
						error
						header={"Error processing request"}
						content={errorMessage}
					/>
					<Icon
						className={styles.closeErrorIcon}
						name="close icon"
						onClick={() => setErrorMessage("")}
					/>
				</div>
			}
		</div>
	);
};

export default NewMessageInput;