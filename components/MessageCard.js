import styles from "./messageCard.module.scss";

import { useState } from "react";
import {
	deleteMessageFromBlockchain,
	editMessageOnBlockchain,
} from "../utils/translationUtils";

const MessageCard = ({index, message, author}) => {
	const [editedMessage, setEditedMessage] = useState("");
	const [editIsOpen, setEditIsOpen] = useState(false);
	const [selectedKey, setSelectedKey] = useState();

	return (
		<div className={styles.messageWrapper}>
		<h3>{message}</h3>
		<p>- {author}</p>
		<p
			className={styles.pointCursor}
			onClick={async () => {
				await deleteMessageFromBlockchain(index);
			}}
		>
			Delete
		</p>
		{editIsOpen && index === selectedKey
			? <div className={styles.editInputContainer}>
				<input
					className={styles.editInput}
					type={"text"}
					value={editedMessage}
					onChange={(e) => setEditedMessage(e.target.value)}
				/>
				<button
					className={styles.editSubmitButton}
					onClick={async () => {
						await editMessageOnBlockchain(index, editedMessage);
					}}
				>
					Edit Message
				</button>

				<p
					className={styles.pointCursor}
					onClick={() => setEditIsOpen(false)}
				>
					x
				</p>
			</div>
			: <p
				className={styles.pointCursor}
				onClick={() => {
					setEditIsOpen(true);
					setSelectedKey(index);
				}}
			>
				Edit
			</p>
		}
	</div>
	);
};

export default MessageCard;