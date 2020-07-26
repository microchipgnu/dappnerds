import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import { Web3ReactProvider } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { ethers } from "ethers";
import ReactNotification from "react-notifications-component";

import App from "./components/App.js";

import "regenerator-runtime/runtime";
import "./index.css";
import "react-chat-widget/lib/styles.css";
import "react-notifications-component/dist/theme.css";

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    1, // Mainet
    3, // Ropsten
    4, // Rinkeby
    5, // Goerli
    42, // Kovan
  ],
});

const getLibrary = (provider) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 12000;

  return library;
};

const Main = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ReactNotification />
      <App injectedConnector={injectedConnector} />
    </Web3ReactProvider>
  );
};

ReactDOM.render(<Main />, document.querySelector("#main"));
