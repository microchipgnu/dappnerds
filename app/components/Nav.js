import React from "react";

const Nav = ({ title, account }) => {
  return (
    <nav className="navbar navbar-light bg-light static-top">
      <span className="navbar-brand mb-0 h1">{title}</span>
      <span
        id="navbarWalletAddress"
        className="navbar-brand mb-0"
        style={{ fontSize: "small" }}
      >
        {!account ? "Connect wallet" : account}
      </span>
    </nav>
  );
};

export default Nav;
