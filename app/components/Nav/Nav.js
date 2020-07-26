import React from "react";

const Nav = ({ title, account }) => {
  return (
    <nav className="navbar navbar-light bg-light static-top">
      <span className="navbar-brand mb-0 h1">{title}</span>

      <a
        target="_blank"
        href={`https://ropsten.etherscan.io/address/${account}`}
      >
        <span
          id="navbarWalletAddress"
          className="navbar-brand mb-0"
          style={{ fontSize: "small" }}
        >
          {!account ? "Connect wallet" : account.toLowerCase()}
        </span>
      </a>
    </nav>
  );
};

export default Nav;
