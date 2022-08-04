import web3 from "../ethereum/web3";
import boardInstance from "../ethereum/bulletinBoard";


export const addMessageToBlockchain = async (newMessage) => {
	try {
		const accounts = await web3.eth.getAccounts();
	
		await boardInstance.methods.addMessage(newMessage).send({
			from: accounts[0],
		});
	} catch (err) {
		console.log("This is the return: ", err);
	}
};

export const deleteMessageFromBlockchain = async (index) => {
	const accounts = await web3.eth.getAccounts();

	await boardInstance.methods.deleteMessage(index).send({
		from: accounts[0],
	});
};

export const editMessageOnBlockchain = async (index, editedMessage) => {
	try {
		const accounts = await web3.eth.getAccounts();
	
		await boardInstance.methods.editMessage(index, editedMessage).send({
			from: accounts[0],
		});
	} catch (err) {
		console.log("This is the return: ", err);
	}
};
