import { useState } from "react";
import boardInstance from "../ethereum/bulletinBoard";
import web3 from "../ethereum/web3";

const Home = ({messages}) => {
	const [newMessage, setNewMessage] = useState("");

	const addMessageToBlockchain = async () => {
		console.log(newMessage);

		const accounts = await web3.eth.getAccounts();

		await boardInstance.methods.addMessage(newMessage).send({
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