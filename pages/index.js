import { useState } from "react";
import boardInstance from "../ethereum/bulletinBoard";
import web3 from "../ethereum/web3";

const Home = ({messages}) => {
	const [newMessage, setNewMessage] = useState("");
	const [editedMessage, setEditedMessage] = useState("");
	const [editIsOpen, setEditIsOpen] = useState(false);
	const [selectedKey, setSelectedKey] = useState();

	const addMessageToBlockchain = async () => {
		const accounts = await web3.eth.getAccounts();

		await boardInstance.methods.addMessage(newMessage).send({
			from: accounts[0],
		});
	};

	const deleteMessageFromBlockchain = async (index) => {
		const accounts = await web3.eth.getAccounts();

		await boardInstance.methods.deleteMessage(index).send({
			from: accounts[0],
		});
	};

	const editMessageOnBlockchain = async (index) => {
		const accounts = await web3.eth.getAccounts();

		await boardInstance.methods.editMessage(index, editedMessage).send({
			from: accounts[0],
		});
	};

	return (
		<div>
			<h1>Bulletin Board</h1>
			<input
				type={"text"}
				value={newMessage}
				onChange={(e) => setNewMessage(e.target.value)}
			/>
			<button onClick={addMessageToBlockchain}>Add a message</button>

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