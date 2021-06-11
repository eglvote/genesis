require("dotenv").config();

const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  contracts_build_directory: path.join(__dirname, "build/contracts"),
  networks: {
    develop: {
      port: 8545,
    },
    ganache: {
      host: "127.0.0.1",
      port: 7545,
      network_id: 5777,
    },
    ropsten: {
      provider: function () {
        return new HDWalletProvider(
          process.env.ROPSTEN_MNEMONIC,
          process.env.ROPSTEN_NODE_URL
        );
      },
      network_id: "3",
    },
    mainnet: {
      provider: function () {
        return new HDWalletProvider(
          process.env.MAINNET_MNEMONIC,
          process.env.MAINNET_NODE_URL
        );
      },
      network_id: "1",
    },
  },
  compilers: {
    solc: {
      version: "0.6.6",
      settings: {
        optimizer: {
          enabled: true,
          runs: 1000   // Optimize for how many times you intend to run the code
        }
      },
    },
  },
  plugins: [
    "truffle-contract-size",
  ],
  mocha: {
    reporter: 'eth-gas-reporter',
    reporterOptions: {
      excludeContracts: ["Migrations"],
      currency: "USD",
      coinmarketcap: process.env.COIN_MARKET_CAP_API_KEY
    },
  }
};
