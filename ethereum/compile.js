const path = require("path");
const fs = require("fs-extra");
const solc = require("solc");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const boardPath = path.resolve(__dirname, "contracts", "BulletinBoard.sol");
const source = fs.readFileSync(boardPath, "utf8");

const input = {
	language: 'Solidity',
	sources: {
	  	'BulletinBoard.sol': {
			content: source,
	  	},
	},
	settings: {
	  	outputSelection: {
			'*': {
		  		'*': ['*'],
			},
		},
	},
};

const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts["BulletinBoard.sol"];

fs.ensureDirSync(buildPath);

for (let contract in output) {
	fs.outputJsonSync(
		path.resolve(buildPath, contract + ".json"),
		output[contract],
	);
};
