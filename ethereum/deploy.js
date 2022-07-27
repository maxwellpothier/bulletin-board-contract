require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");

const compiledBoard = require("../ethereum/build/BulletinBoard.json");

const provider = new HDWalletProvider(
	process.env.WALLET_MNEMONIC,
	process.env.RINKEBY_KEY
);

const web3 = new Web3(provider);

const deploy = async () => {
	const accounts = await web3.eth.getAccounts();
	console.log("Attempting to deploy from account: ", accounts[0]);

	const result = await new web3.eth.Contract(compiledBoard.abi)
		.deploy({data: compiledBoard.evm.bytecode.object})
		.send({gas: "1000000", from: accounts[0]});

	console.log("Contract deployed to: ", result.options.address);

	provider.engine.stop();
}

deploy();