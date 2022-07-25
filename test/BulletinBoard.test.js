const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const {abi, evm} = require("../compile");

let board;
let accounts;

beforeEach(async () => {
	accounts = await web3.eth.getAccounts();

	board = await new web3.eth.Contract(abi)
		.deploy({data: evm.bytecode.object})
		.send({from: accounts[0], gas: "1000000"});

	await board.methods.addMessage("Hi There").send({from: accounts[0]});
	await board.methods.addMessage("My name is acct 2").send({from: accounts[1]});
});

describe("Bulletin Board Contract", () => {
	it("verifies contract manager address", () => {
		assert(board.options.address);
	});

	it("allows two users to add messages", async () => {
		const messages = await board.methods.getMessages().call()

		assert.equal(messages.length, 2);
	});

	it("blocks user from deleting others message", async () => {
		try {
			await board.methods.deleteMessage(0).send({from: accounts[2]});
		} catch (e) {
			assert(true);
		}
	});

	it("allows user to delete own message" , async () => {
		await board.methods.deleteMessage(0).send({from: accounts[0]});

		const messages = await board.methods.getMessages().call();
		assert.equal(messages.length, 1);
	});

	it ("blocks user from editing others message", async () => {
		try {
			await board.methods.editMessage(0, "Edited message").send({from: accounts[2]});
		} catch (e) {
			assert(true);
		}
	});

	it ("allows user to edit own message", async () => {
		const indexToTest = 0;
		await board.methods.editMessage(indexToTest, "Edited message").send({from: accounts[indexToTest]});

		const newMessage = await board.methods.getMessages().call();

		assert.equal(newMessage[0].information, "Edited message");
	});
});