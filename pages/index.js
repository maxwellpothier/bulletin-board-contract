import { useState } from "react";
import boardInstance from "../ethereum/bulletinBoard";
import MessageCard from "../components/MessageCard";
import NewMessageInput from "../components/NewMessageInput";
import Head from "next/head";

import styles from "./index.module.scss";

const Home = ({messages}) => {
	const [newMessage, setNewMessage] = useState("");

	return (
		<div className={styles.applicationWrapper}>
			<Head>
				<link
					async
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
				/>
			</Head>
			<h1>Bulletin Board</h1>
			<p>Etherscan</p>

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