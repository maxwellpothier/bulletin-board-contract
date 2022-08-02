import { useState } from "react";
import {
	deleteMessageFromBlockchain,
	editMessageOnBlockchain,
} from "../utils/translationUtils";
import EditDeleteSection from "./EditDeleteSection";

import styles from "./messageCard.module.scss";

const MessageCard = ({index, message, author}) => {
	const [editedMessage, setEditedMessage] = useState("");
	const [editIsOpen, setEditIsOpen] = useState(false);
	const [selectedKey, setSelectedKey] = useState();

	return (
		<div className={styles.messageWrapper}>
			<h3>{message}</h3>
			<p>{author}</p>
			<EditDeleteSection index={index}/>
		</div>
	);
};

export default MessageCard;