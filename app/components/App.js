import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";

import Web3 from "web3";

import Nav from "./Nav";
import Jumbo from "./Jumbo";

// TODO: add UI from ABI and address
import SmartContract from "./SmartContract";

import Chat from "./Chat";

import useSWR from "swr";

import { fetcher } from "./utils";

const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://ropsten.infura.io/v3/b07f4c7f3500465eac2c790c3cfcb359"
  )
);

const networks = {
  1: "Main",
  3: "Ropsten",
  4: "Rinkeby"
};

const app = {
  data: {
    nav: {
      title: "DappNerds"
    },
    jumbo: {
      title: "🏗️ Ethereum Dappboard 🌐",
      subtitle:
        "A decentralized dashboard application for the Ethereum blockchain."
    }
  }
};

export const Balance = () => {
  const { account, library } = useWeb3React();
  const { data: balance } = useSWR(["getBalance", account, "latest"], {
    fetcher: fetcher(library)
  });
  if (!balance) {
    return <div>...</div>;
  }
  // return <div>Ξ {balance.toString()}</div>
  return <div>Ξ {balance}</div>;
};

const App = ({ injectedConnector }) => {
  const { chainId, activate, account, active } = useWeb3React();

  const [latestBlock, setLatestBlock] = useState();

  useEffect(() => {
    activate(injectedConnector);
  }, []);

  /*useEffect(() => {
    const interval = setInterval(async () => {
      const latestBlock = await web3.eth.getBlock("latest");
      setLatestBlock(latestBlock);
      console.log(latestBlock);
    }, 30000);

    return () => {
      clearInterval(interval);
    };
  }, []);*/

  return (
    <>
      <>
        <Nav title={app.data.nav.title} account={account} />
        {active && <Balance />}
        <Jumbo
          title={app.data.jumbo.title}
          subtitle={app.data.jumbo.subtitle}
          account={account}
          block={latestBlock}
          chainId={chainId}
          account={account}
        />
        <Chat
          title="Ethereum Chat"
          subtitle="All messages, uncensored."
          web3={web3}
        />
      </>
    </>
  );
};

export default App;
