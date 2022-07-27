import boardInstance from "../ethereum/bulletinBoard";

const Home = ({messages}) => {

	return (
		<div>
			<h1>Home Page</h1>
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