const { deployProxy, admin } = require("@openzeppelin/truffle-upgrades");
const EglGenesis = artifacts.require("./EglGenesis.sol");
const ConsoleColors = {
  BLACK: "\x1b[30m \x1b[0m",
  RED: "\x1b[31m%s\x1b[0m",
  GREEN: "\x1b[32m%s\x1b[0m",
  YELLOW: "\x1b[33m%s\x1b[0m",
  BLUE: "\x1b[34m%s\x1b[0m",
  MAGENTA: "\x1b[35m%s\x1b[0m",
  CYAN: "\x1b[36m%s\x1b[0m",
  WHITE: "\x1b[37m%s\x1b[0m",
}

module.exports = async function (deployer, network, accounts) {
  let genesisOwner = "";
  let newProxyAdmin = "";
  let threshold = "";

  if (network === "mainnet") {
    throw "Check Contract Arguments!"
    genesisOwner = "";
    newProxyAdmin = "";
    threshold = web3.utils.toWei("0");
  }
  if (network === "ropsten") {
    genesisOwner = accounts[0];
    newProxyAdmin = accounts[9];
    threshold = web3.utils.toWei("5");
  }
  if (network === "ganache") {
    genesisOwner = accounts[0];
    newProxyAdmin = accounts[9];
    threshold = web3.utils.toWei("10");
  }

  let genesisContract = await deployProxy(
    EglGenesis, 
    [genesisOwner, threshold], 
    { deployer }
  );
  console.log(
    `EGL Genesis deployed to address: ${ConsoleColors.GREEN}`,
    genesisContract.address
  );

  admin.changeProxyAdmin(genesisContract.address, newProxyAdmin);
  console.log(
    `EGL Genesis Proxy Admin set to: ${ConsoleColors.GREEN}`,
    newProxyAdmin
  );
};
