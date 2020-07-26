import React, { useEffect } from "react";
import moment from "moment";
import { useWeb3React } from "@web3-react/core";
import { formatEther, formatUnits } from "@ethersproject/units";
import useSWR from "swr";
import { store } from "react-notifications-component";

import JumboCard from "./JumboCard";
import JumboCardElement from "./JumboCardElement";

const Jumbo = ({ title, subtitle, chainId, account }) => {
  const { library } = useWeb3React();

  const { data: block, mutate: getBlockMutate } = useSWR([
    "getBlock",
    "latest",
  ]);

  const { data: balance, mutate: getBalanceMutate } = useSWR([
    "getBalance",
    account,
    "latest",
  ]);

  useEffect(() => {
    library.on("block", (block) => {
      getBlockMutate(undefined, true);
      getBalanceMutate(undefined, true);

      store.addNotification({
        title: `Block ${block}`,
        message: `New block found`,
        type: "info",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
    });
    return () => {
      library.removeAllListeners("block");
    };
  }, []);

  return (
    <div className="jumbotron jumbotron-fluid">
      <div className="container">
        <h1 className="display-4">{title}</h1>
        <p className="lead">{subtitle}</p>

        <section style={{ marginTop: "10vh" }}>
          <div className="row">
            <JumboCard title="Network Status">
              <JumboCardElement title="Chain Id" value={chainId} />
            </JumboCard>

            <JumboCard title="Blockchain Status">
              <JumboCardElement
                title="Latest Block"
                value={block && block.number}
              />
              <JumboCardElement
                title="Number of Transactions"
                value={block && block.transactions && block.transactions.length}
              />
              <JumboCardElement
                title="Created"
                value={block && moment.unix(block.timestamp).format()}
              />
            </JumboCard>

            <JumboCard title="Account">
              <JumboCardElement
                title="Address"
                value={account.toLowerCase().slice(0, 7)}
              />
              <JumboCardElement
                title="Balance"
                value={
                  balance &&
                  `${parseFloat(formatEther(balance)).toPrecision(4)} Ξ`
                }
              />

              <a target="_blank" href="https://faucet.ropsten.be/">
                Fund it with testnet Ether
              </a>
            </JumboCard>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Jumbo;
