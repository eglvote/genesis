![EGL Logo][logo]

[![Build Status](https://travis-ci.com/bloXroute-Labs/egl_genesis.svg?token=7P16gQwBsynsaBwrjxuH&branch=master)](https://travis-ci.com/bloXroute-Labs/egl_genesis)

# Smart Contracts
## Prerequisites
+ Install [Node.js][node.js]
+ Install [yarn][yarn]: `npm install --global yarn`
+ Install [Truffle][truffle]: `yarn global add truffle`
+ Install [Ganache-cli][ganache-cli]: `yarn global add ganache-cli`
+ Install project dependencies: `yarn install`

[Truffle][truffle] and [Ganache][ganache] are required to compile, test and deploy the smart contracts. In order to connect to the public networks (Ropsten/Mainnet), truffle requires an endpoint of an Ethereum node to connect to in order to send transactions to. This can either be a synced local node (like geth) or more conveniently, an [Infura][infura] node with API key. The `truffle-config.js` is currently configured to connect to Infura but requires an API key in order to connect. This key, as well as the wallet mnemonic used for deployments, is configured in a `.env` file which you will need to create. It is not (and should not be) committed to source control. There is also a `COIN_MARKET_CAP_API_KEY` variable that is used by the gas reporter plugin. Set this to an empty string if you don't have a CoinMarketCap API key. 

The `.env` file should take the following format:
```
MAINNET_NODE_URL=https://mainnet.infura.io/v3/<YOUR_API_KEY>
MAINNET_MNEMONIC="YOUR_MAINNET_MNEMONIC"

ROPSTEN_NODE_URL=https://ropsten.infura.io/v3/<YOUR_API_KEY>
ROPSTEN_MNEMONIC="YOUR_ROPSTEN_MNEMONIC"

COIN_MARKET_CAP_API_KEY="YOUR_COIN_MARKET_CAP_API_KEY"
```

## Compiling, Deploying and Testing:
**NOTE:** When using the ganache network, Ganache or Ganache-cli must be running before the commands below are executed.
+ Compile contracts: `yarn compile`  
+ Run tests against local Ganache: `yarn test`  
+ Deploy contracts to local Ganache: `yarn mig-ganache`  
+ Deploy contracts to Ropsten: `yarn mig-ropsten`

## Interacting with Contracts from the console:
+ Start the console and connect to Ganache: `yarn con-ganache`  
+ Start the console and connect to Ropsten (requires Infura key configured in `.env`): `yarn con-ropsten`

[logo]: assets/GithubBanner.svg
[truffle]: https://www.trufflesuite.com/truffle
[ganache]: https://www.trufflesuite.com/ganache
[ganache-cli]: https://github.com/trufflesuite/ganache-cli/blob/master/README.md
[infura]: https://infura.io/
[node.js]: https://nodejs.org/en/download/
[yarn]: https://yarnpkg.com/getting-started/install
