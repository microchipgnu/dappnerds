pragma solidity ^0.6.0;

contract SimpleStorage {
    
    uint public store;
    
    function readStore () public view returns (uint) {
        return store;
    }
    
    function writeStore (uint value) public {
        store = value;
    }
}