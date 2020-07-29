pragma solidity ^0.6.0;

contract Chat {
    event NewMessage(string message, address user, uint timestamp, string roomName);

    struct Message {
        string message;
        address user;
        uint timestamp;
    }

    mapping(string => Message[]) roomNameToMessages;

    constructor() public {}

    function sendMessage(string memory _msg, string memory _roomName) external {
        Message memory message = Message(_msg, msg.sender, block.timestamp);
        roomNameToMessages[_roomName].push(message);
        emit NewMessage(_msg, msg.sender, block.timestamp, _roomName);
    }

    function getMessageCountForRoom(string memory _roomName) external view returns (uint) {
        return roomNameToMessages[_roomName].length;
    }

    function getMessageByIndexForRoom(string memory _roomName, uint _index) external view returns (string memory, address, uint) {
        Message memory message = roomNameToMessages[_roomName][_index];
        return (message.message, message.user, message.timestamp);
    }
}