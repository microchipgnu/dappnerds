import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { SWRConfig } from "swr";
import { ethFetcher } from "ether-swr";

import Nav from "./Nav/Nav";
import Jumbo from "./Hero/Jumbo";

// TODO: add UI from ABI and address
import SmartContract from "./SmartContract";
import Chat from "./Chat/Chat";


const app = {
  data: {
    nav: {
      title: "DappNerds",
    },
    jumbo: {
      title: "🏗️ Ethereum Dappboard 🌐",
      subtitle:
        "A decentralized dashboard application for the Ethereum blockchain.",
    },
  },
};

const App = ({ injectedConnector }) => {
  const { chainId, activate, account, active, library } = useWeb3React();

  useEffect(() => {
    activate(injectedConnector);
  }, []);

  return (
    <>
      {active && (
        <SWRConfig value={{ fetcher: ethFetcher(library) }}>
          <Nav title={app.data.nav.title} account={active ? account : "..."} />
          <Jumbo
            title={app.data.jumbo.title}
            subtitle={app.data.jumbo.subtitle}
            account={account}
            chainId={chainId}
            account={account ? account : "..."}
          />
          <Chat
            title="Ethereum Chat"
            subtitle="All messages forever on the blockchain."
            web3={web3}
          />
          <SmartContract />
        </SWRConfig>
      )}
    </>
  );
};

export default App;
