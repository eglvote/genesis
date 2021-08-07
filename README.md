![EGL Logo][logo]

[![Build Status](https://travis-ci.com/bloXroute-Labs/egl_genesis.svg?token=7P16gQwBsynsaBwrjxuH&branch=master)](https://travis-ci.com/bloXroute-Labs/egl_genesis)

# EGL Staking Notice
By agreeing to stake Ethereum:

- You agree that staked Ethereum will be locked up for a specified duration, will not be retrievable for that period, and that any staking of tokens has various associated risks.

- You are obligated to maintain balancer pool tokens  in a Balancer pool containing ETH and EGL for between 10 and 52 weeks. The resulting balancer pool tokens will be held by the EGL smart contract, and gradually released to the Genesis supporters, as specified further here: https://docs.egl.vote/protocol-overview/launch.

- You agree to consume EGL and utilize the tokens for voting purposes, as summarized here: https://docs.egl.vote/protocol-overview/voting. For users who fail to vote, the protocol may take certain actions by default that may impact the price of the Ethereum gas limit and/or impact EGL. EGL is intended to be immediately consumed by advanced Ethereum developers and stakeholders; utilize it at your own discretion and risk. EGL is intended solely as a means of collective voting on the Ethereum gas limit; users should have no expectations of profits.

- You understand and agree that EGL is a decentralized, open source project, so that the parameters of the protocol and the code base itself can change, including core technical features and material properties of the token.

- While we hope it never happens, you understand and agree that the staking of tokens is a non-custodial arrangement that has technical and financial risks, including risk of inaccessibility, decreases in value, and complete loss. You understand and agree that under no circumstances shall the developers of this smart contract or contributors to EGL be liable for any loss or damage you might experience.

By staking Ethereum or accessing or otherwise using this smart contract, you agree that you have read and understood, and, as a condition of your use of the smart contract, you agree to be bound by these terms.

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
