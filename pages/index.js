import { useState } from "react";
import boardInstance from "../ethereum/bulletinBoard";
import MessageCard from "../components/MessageCard";
import NewMessageInput from "../components/NewMessageInput";

const Home = ({messages}) => {
	const [newMessage, setNewMessage] = useState("");

	return (
		<div>
			<h1>Bulletin Board</h1>

			<NewMessageInput/>

			{messages.map((message, i) => (
				<MessageCard
					key={i}
					index={i}
					message={message[0]}
					author={message[1]}
				/>
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