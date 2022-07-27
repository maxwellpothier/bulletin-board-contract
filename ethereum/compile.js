const path = require("path");
const fs = require("fs");
const solc = require("solc");

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

module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts["BulletinBoard.sol"].BulletinBoard;
