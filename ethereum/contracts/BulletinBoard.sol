// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

contract BulletinBoard {
    struct Message {
        string information;
        address author;
    }

    Message[] public messages;

    function addMessage(string memory newMessage) public {
        messages.push(Message(newMessage, msg.sender));
    }

    function deleteMessage(uint256 index) public {
        require(messages[index].author == msg.sender);
        messages[index] = messages[messages.length - 1];
        messages.pop();
    }

    function editMessage(uint256 index, string memory newMessage) public {
        require(messages[index].author == msg.sender);
        messages[index].information = newMessage;
    }

    function getMessages() public view returns (Message[] memory) {
        return messages;
    }
}
