import { useState } from "react";
import boardInstance from "../ethereum/bulletinBoard";
import {
	addMessageToBlockchain,
	deleteMessageFromBlockchain,
	editMessageOnBlockchain,
} from "../utils/translationUtils";

const Home = ({messages}) => {
	const [newMessage, setNewMessage] = useState("");
	const [editedMessage, setEditedMessage] = useState("");
	const [editIsOpen, setEditIsOpen] = useState(false);
	const [selectedKey, setSelectedKey] = useState();

	return (
		<div>
			<h1>Bulletin Board</h1>
			<input
				type={"text"}
				value={newMessage}
				onChange={(e) => setNewMessage(e.target.value)}
			/>
			<button onClick={() => addMessageToBlockchain(newMessage)}>Add a message</button>

			{messages.map((message, i) => (
				<div key={i}>
					<h3>{message[0]}</h3>
					<p>{message[1]}</p>
					<p onClick={() => deleteMessageFromBlockchain(i)}>Delete</p>
					{editIsOpen && i === selectedKey
						?	<div>
								<input
									type={"text"}
									value={editedMessage}
									onChange={(e) => setEditedMessage(e.target.value)}
								/>
								<button onClick={() => editMessageOnBlockchain(i, editedMessage)}>Edit Message</button>
								<p onClick={() => setEditIsOpen(false)}>x</p>
							</div>
						: <p onClick={() => {
							setEditIsOpen(true);
							setSelectedKey(i);
						}}>Edit</p>
					}
				</div>
			))}
		</div>

	);
};

export async function getStaticProps() {
	const messages = await boardInstance.methods.getMessages().call();

	return {
		props: {
			messages,
		}
	};
}

export default Home;