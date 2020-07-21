import React, { useState } from "react";
import { Widget } from "react-chat-widget";

import "react-chat-widget/lib/styles.css";

const sm_abi = {
  compiler: { version: "0.4.26+commit.4563c3fc" },
  language: "Solidity",
  output: {
    abi: [
      {
        constant: true,
        inputs: [
          { name: "_roomName", type: "string" },
          { name: "_index", type: "uint256" }
        ],
        name: "getMessageByIndexForRoom",
        outputs: [
          { name: "", type: "string" },
          { name: "", type: "address" },
          { name: "", type: "uint256" }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: true,
        inputs: [{ name: "_user", type: "address" }],
        name: "getUsernameForAddress",
        outputs: [{ name: "", type: "string" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: false,
        inputs: [],
        name: "kill",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          { name: "_msg", type: "string" },
          { name: "_roomName", type: "string" }
        ],
        name: "sendMessage",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: false,
        inputs: [{ name: "_name", type: "string" }],
        name: "createUser",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: true,
        inputs: [{ name: "_roomName", type: "string" }],
        name: "getMessageCountForRoom",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor"
      },
      {
        anonymous: false,
        inputs: [
          { indexed: false, name: "message", type: "string" },
          { indexed: false, name: "user", type: "address" },
          { indexed: false, name: "timestamp", type: "uint256" },
          { indexed: false, name: "roomName", type: "string" }
        ],
        name: "NewMessage",
        type: "event"
      }
    ],
    devdoc: { methods: {} },
    userdoc: { methods: {} }
  },
  settings: {
    compilationTarget: { "browser/chat.sol": "Chat" },
    evmVersion: "byzantium",
    libraries: {},
    optimizer: { enabled: false, runs: 200 },
    remappings: []
  },
  sources: {
    "browser/chat.sol": {
      keccak256:
        "0x1af5cd94ae56777c49f545edfb5870e8fae4fe2fd6a819f8e5f5f4ebbbebfc36",
      urls: [
        "bzzr://f7c4c68bfdeefb1156e9f39fce004ad5d48ceaf5ce354076d7a6131dedfc5912"
      ]
    }
  },
  version: 1
};
const sm_address = "0xe8f929dc1ee511e8c20224600dc14d7f06df2ccc";

const Chat = ({ title, subtitle, web3 }) => {
  const [abi, setAbi] = useState();
  const [address, setAddress] = useState();
  const [messages, setMessages] = useState();

  return <Widget title={title} subtitle={subtitle} />;
};

export default Chat;
