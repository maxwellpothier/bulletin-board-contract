import { useState } from "react";
import EditDeleteSection from "./EditDeleteSection";
import { Message } from "semantic-ui-react";

import styles from "./messageCard.module.scss";

const MessageCard = ({ index, message, author }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	return (
		<div>
			<div className={styles.cardWrapper}>
				<div className={styles.messageContainer}>
					<h3>{message}</h3>
					<p>{author}</p>
					<EditDeleteSection
						index={index}
						setIsLoading={setIsLoading}
						setErrorMessage={setErrorMessage}
					/>
				</div>
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

export default MessageCard;