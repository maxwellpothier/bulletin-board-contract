import web3 from "./web3";
import BulletinBoard from "./build/BulletinBoard.json";

const boardInstance = new web3.eth.Contract(
	BulletinBoard.abi,
	"0x5c0a1fffe8aCc0DB69b04D21E0f694fe8bCa0b47",
);

export default boardInstance;