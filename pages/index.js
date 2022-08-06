import { useState } from "react";
import boardInstance from "../ethereum/bulletinBoard";
import MessageCard from "../components/MessageCard";
import NewMessageInput from "../components/NewMessageInput";
import Head from "next/head";

import styles from "./index.module.scss";

const Home = ({messages}) => {
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
			<div className={styles.etherscanLink}>
				<a
					href={"https://rinkeby.etherscan.io/address/0x5c0a1fffe8aCc0DB69b04D21E0f694fe8bCa0b47"}
					target={"_blank"}
				>
					Etherscan
				</a>
			</div>

			<NewMessageInput/>

			{messages.map((message, i) => (
				<div className={styles.messageWrapper}>
					<MessageCard
						key={i}
						index={i}
						message={message[0]}
						author={message[1]}
					/>
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