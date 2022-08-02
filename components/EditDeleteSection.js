import { useState } from "react";
import { Icon } from "semantic-ui-react";
import { deleteMessageFromBlockchain, editMessageOnBlockchain } from "../utils/translationUtils";

import styles from "./editDeleteMessage.module.scss";

const EditDeleteSection = ({index, setIsLoading}) => {
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
						setIsLoading(true);
						await deleteMessageFromBlockchain(index);
						setIsLoading(false);
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
							setIsLoading(true);
							await editMessageOnBlockchain(index, editedMessage);
							setIsLoading(false);
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