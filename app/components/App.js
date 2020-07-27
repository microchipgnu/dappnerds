import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { SWRConfig } from "swr";
import { ethFetcher } from "ether-swr";

import Nav from "./Nav/Nav";
import Jumbo from "./Hero/Jumbo";

import SmartContract from "./SmartContract/SmartContract";
import Chat from "./Chat/Chat";

import ChatABI from "../abi/chat.json";
import SupplyChainABI from "../abi/supplychain.json";

const App = ({ injectedConnector }) => {
  const { chainId, activate, account, active, library } = useWeb3React();

  useEffect(() => {
    activate(injectedConnector);
  }, []);

  return (
    <>
      {active && (
        <SWRConfig value={{ fetcher: ethFetcher(library) }}>
          <Nav title={"DappNerds"} account={active ? account : "..."} />
          <Jumbo
            title={"🏗️ Ethereum Dappboard 🌐"}
            subtitle={
              "A decentralized dashboard application for the Ethereum blockchain."
            }
            account={account}
            chainId={chainId}
            account={account ? account : "..."}
          />
          <Chat
            title="Ethereum Chat"
            subtitle="All messages forever on the blockchain."
            web3={web3}
          />
          <SmartContract
            title={"Smart Contract"}
            description={"Auto-generate UI for verified smart contracts."}
            contractAddress={"0x6dACCFB895bA0C4E0A6D2C37c5cD581108d0F93C"}
            //contractAddress={"0x55CDa35852d03EF9e16CE7011018ecb8E946c216"}
            //abi={SupplyChainABI}
          />
        </SWRConfig>
      )}
    </>
  );
};

export default App;
