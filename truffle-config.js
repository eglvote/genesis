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
            skipDryRun: true,
        },
        kovan: {
            provider: function () {
                return new HDWalletProvider(
                    process.env.KOVAN_MNEMONIC,
                    process.env.KOVAN_NODE_URL
                );
            },
            network_id: "42",
            skipDryRun: true,
        },
        rinkeby: {
            provider: function () {
                return new HDWalletProvider(
                    process.env.RINKEBY_MNEMONIC,
                    process.env.RINKEBY_NODE_URL
                );
            },
            network_id: "4",
            skipDryRun: true,
        },
        mainnet: {
            provider: function () {
                return new HDWalletProvider(
                    process.env.MAINNET_MNEMONIC,
                    process.env.MAINNET_NODE_URL
                );
            },
            gas: 1500000,
            gasPrice: 55000000000,
            network_id: "1",
            skipDryRun: true,
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
        "truffle-plugin-verify",
    ],
    api_keys: {
        etherscan: process.env.ETHERSCAN_API_KEY
    },
    mocha: {
        reporter: 'eth-gas-reporter',
        reporterOptions: {
            excludeContracts: ["Migrations"],
            currency: "USD",
            coinmarketcap: process.env.COIN_MARKET_CAP_API_KEY
        },
    }
};
