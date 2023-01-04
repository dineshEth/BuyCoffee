// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;


contract BuyCoffee {

    // coffee buyer
    struct Memo{
        string name;
        string description;
        uint timestamp;
        address from;
    }

    address payable owner;
    constructor() {
        owner = payable(msg.sender);
    }
    
    Memo[] memos;

    function buyCoffee(string memory _name,string memory _message)public payable{
        require(msg.value >0 ,"Provide true amount");
        owner.transfer(msg.value);
        memos.push(Memo(_name,_message,block.timestamp,msg.sender));
    }

    function getMemo() public view returns(Memo[] memory){
        return memos;
    }
}

//  0x5FbDB2315678afecb367f032d93F642f64180aa3 conrtract address deployed on hardhat
