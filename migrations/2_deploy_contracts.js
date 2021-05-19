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
  let multisigAddress = "0x856Aa6Dd22Bf637ea534219B352fcCb4012c8F25";
  if (network === "ropsten") {
    multisigAddress = accounts[0];
  }
  if (network === "ganache") {
    multisigAddress = accounts[0];
  }

  let genesisContract = await deployProxy(
    EglGenesis, 
    [multisigAddress, web3.utils.toWei("10")], 
    { deployer }
  );
  console.log(
    `EGL Genesis deployed to address: ${ConsoleColors.GREEN}`,
    genesisContract.address
  );

  // TODO: Ensure multisig address can call relevant function to upgrade contracts
  admin.changeProxyAdmin(genesisContract.address, multisigAddress);
  console.log(
    `EGL Genesis Contract admin set to: ${ConsoleColors.GREEN}`,
    multisigAddress
  );
};
