import { useState } from "react";
import EditDeleteSection from "./EditDeleteSection";

import styles from "./messageCard.module.scss";

const MessageCard = ({ index, message, author, setErrorMessage }) => {
	const [isLoading, setIsLoading] = useState(false);

	return (
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
	);
};

export default MessageCard;