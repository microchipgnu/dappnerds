pragma solidity ^0.4.6;

contract Chat {

    event NewMessage(string message, address user, uint timestamp, string roomName);

    address owner;

    struct Message {
        string message;
        address user;
        uint timestamp;
    }

    mapping(string => Message[]) roomNameToMessages;
    mapping(address => string) addressToUsername;

    function Chat() public {
        owner = msg.sender;
    }

    function sendMessage(string _msg, string _roomName) external {
        Message memory message = Message(_msg, msg.sender, block.timestamp);
        roomNameToMessages[_roomName].push(message);
        NewMessage(_msg, msg.sender, block.timestamp, _roomName);
    }

    function createUser(string _name) external {
        addressToUsername[msg.sender] = _name;
    }

    function getUsernameForAddress(address _user) external view returns (string) {
        return addressToUsername[_user];
    }

    function getMessageCountForRoom(string _roomName) external view returns (uint) {
        return roomNameToMessages[_roomName].length;
    }

    function getMessageByIndexForRoom(string _roomName, uint _index) external view returns (string, address, uint) {
        Message memory message = roomNameToMessages[_roomName][_index];
        return (message.message, message.user, message.timestamp);
    }

    function kill() external {
        if (owner == msg.sender) {
            selfdestruct(owner);
        }
    }
}