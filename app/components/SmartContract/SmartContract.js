// This component generates UI to interact with your smart contract.

import React from "react";
import { useWeb3React } from "@web3-react/core";
import { Contract } from "@ethersproject/contracts";
import fetch from "unfetch";
import useSWR from "swr";

import Method from "./Method";

const fetcher = (url) => fetch(url).then((r) => r.json());
const abiFetcher = (url) =>
  fetch(url)
    .then((r) => r.json())
    .then((json) => JSON.parse(json.result));

const SmartContract = ({
  title = "",
  description = "",
  contractAddress,
  abi,
}) => {
  const { library, account } = useWeb3React();

  const { data: events } = useSWR(
    `https://api-ropsten.etherscan.io/api?module=logs&action=getLogs&fromBlock=genesis&toBlock=latest&address=${contractAddress}&apikey=X8AMVJABPG8KEAZ5Z6A5VS19CB1WBZW7GT`,
    fetcher
  );

  const { data: txList } = useSWR(
    `https://api-ropsten.etherscan.io/api?module=account&action=txlist&address=${contractAddress}&startblock=0&endblock=99999999&sort=asc&apikey=X8AMVJABPG8KEAZ5Z6A5VS19CB1WBZW7GT`,
    fetcher
  );

  const { data: ABI } = useSWR(
    `https://api-ropsten.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=X8AMVJABPG8KEAZ5Z6A5VS19CB1WBZW7GT`,
    abiFetcher
  );

  let contract;
  if (ABI) contract = new Contract(contractAddress, ABI, library.getSigner());

  return (
    <div className="container">
      <h1>{title}</h1>
      <p>{description}</p>
      <p>
        Interacting with{" "}
        <a
          target="_blank"
          href={`https://ropsten.etherscan.io/address/${contractAddress}`}
        >
          {contractAddress}
        </a>
      </p>
      <p>Number of events: {events && events.result.length}</p>
      <p>Number of transactions: {txList && txList.result.length}</p>

      {ABI &&
        ABI.map((elm) => {
          const { type, name, stateMutability, inputs, outputs } = elm;
          if (type === "function") {
            return (
              <Method
                type={type}
                name={name}
                stateMutability={stateMutability}
                inputs={inputs}
                contract={contract}
                outputs={outputs}
              />
            );
          }
        })}
    </div>
  );
};

export default SmartContract;
