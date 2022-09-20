require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config({ path: ".env" });

const REACT_APP_GOERLI_RPC_URL = process.env.REACT_APP_GOERLI_RPC_URL;

const REACT_APP_PVT_KEY = process.env.REACT_APP_PVT_KEY;

module.exports = {
  solidity: "0.8.4",
  networks: {
    goerli: {
      url: REACT_APP_GOERLI_RPC_URL,
      accounts: [REACT_APP_PVT_KEY],
    }
  },
  etherscan: {
    apiKey: "RP4K417VB58D9NJ9MTFK5PUJ3KH31GKQ9N",
  },
};
