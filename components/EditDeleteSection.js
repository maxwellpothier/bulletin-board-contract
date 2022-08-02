import { useState } from "react";
import { Icon } from "semantic-ui-react";
import { deleteMessageFromBlockchain, editMessageOnBlockchain } from "../utils/translationUtils";

import styles from "./editDeleteMessage.module.scss";

const EditDeleteSection = ({index}) => {
	const [editIsOpen, setEditIsOpen] = useState(false);
	const [editedMessage, setEditedMessage] = useState("");

	return (
		<div>
			<div className={styles.editDeleteContainer}>
				<Icon
					className={styles.editIcon}
					name={editIsOpen ? "close icon" : "edit icon"}
					onClick={() => setEditIsOpen(!editIsOpen)}
				/>
				<Icon
					className={styles.deleteIcon}
					name={"trash alternate icon"}
					onClick={async () => {
						await deleteMessageFromBlockchain(index);
					}}
				/>
			</div>
			{editIsOpen &&
				<div className={styles.editInputWrapper}>
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
				</div>
			}


		</div>
	);
};

export default EditDeleteSection;