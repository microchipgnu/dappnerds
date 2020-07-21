import React from "react";
import moment from "moment";
import JumboCard from "./JumboCard";
import JumboCardElement from "./JumboCardElement";

const Jumbo = ({ title, subtitle, chainId, block, account }) => {
  return (
    <div className="jumbotron jumbotron-fluid">
      <div className="container">
        <h1 className="display-4">{title}</h1>
        <p className="lead">{subtitle}</p>

        <section style={{ marginTop: "10vh" }}>
          <div className="row">
            <JumboCard title="Network Status">
              <JumboCardElement
                title="Chain Id"
                value={chainId}
              />
            </JumboCard>

            <JumboCard title="Blockchain Status">
              <JumboCardElement
                title="Latest Block"
                value={block && block.number}
              />
              <JumboCardElement
                title="Number of Transactions"
                value={block && block.transactions.length}
              />
              <JumboCardElement
                title="Gas Limit"
                value={block && block.gasLimit}
              />
              <JumboCardElement
                title="Gas Used"
                value={block && block.gasUsed}
              />
              <JumboCardElement
                title="Created"
                value={
                  block &&
                  moment.unix(block.timestamp).format()
                }
              />
              <span
                className="spinner-grow spinner-grow-sm"
                role="status"
                aria-hidden="true"
              ></span>
            </JumboCard>

            <JumboCard title="Account">
              <JumboCardElement
                title="Address"
                value={account}
              />

              <a target="_blank" href="https://faucet.ropsten.be/">
                Fund it with Ether
              </a>
            </JumboCard>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Jumbo;
