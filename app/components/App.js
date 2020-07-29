import React, { useEffect } from "react";
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
      <Nav title={"DappNerds"} account={active ? account : "..."} />
      {!active && (
        <div className="container text-center">
          <p>Please, unlock your Metamask wallet.</p>
        </div>
      )}
      {active && (
        <SWRConfig value={{ fetcher: ethFetcher(library) }}>
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
            room={"test"}
          />
          {chainId === 3 && (
            <>
              <SmartContract
                title={"Smart Contract - Simple Supply Chain"}
                description={"Auto-generated UI for verified smart contracts."}
                contractAddress={"0x6dACCFB895bA0C4E0A6D2C37c5cD581108d0F93C"}
              />
              <SmartContract
                title={"Smart Contract - Chat"}
                description={"Auto-generated UI for verified smart contracts."}
                contractAddress={"0xe8f929dc1ee511e8c20224600dc14d7f06df2ccc"}
              />
            </>
          )}
        </SWRConfig>
      )}
    </>
  );
};

export default App;
