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
		<div>
		<h3>{message}</h3>
		<p>{author}</p>
		<p onClick={() => deleteMessageFromBlockchain(index)}>Delete</p>
		{editIsOpen && index === selectedKey
			?	<div>
					<input
						type={"text"}
						value={editedMessage}
						onChange={(e) => setEditedMessage(e.target.value)}
					/>
					<button onClick={() => editMessageOnBlockchain(index, editedMessage)}>Edit Message</button>
					<p onClick={() => setEditIsOpen(false)}>x</p>
				</div>
			: <p onClick={() => {
				setEditIsOpen(true);
				setSelectedKey(index);
			}}>Edit</p>
		}
	</div>
	);
};

export default MessageCard;