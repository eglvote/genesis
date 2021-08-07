const { deployProxy } = require("@openzeppelin/truffle-upgrades");
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
    console.log(
        `Deploying ${ConsoleColors.MAGENTA} to ${ConsoleColors.MAGENTA} \n`, "EGL GENESIS", network.toUpperCase()
    );

    let genesisOwner = "";
    let threshold = "";

    if (network === "mainnet") {        
        genesisOwner = "0x72E995cb1148b6BF4C27484824AB5D08B2b6Ca7d";
        threshold = web3.utils.toWei("100000");
    }
    if (network === "ropsten") {
        genesisOwner = accounts[1];
        threshold = web3.utils.toWei("100");
    }
    if (network === "kovan") {
        genesisOwner = "0x2755f888047Db8E3d169C6A427470C44b19a7270";
        threshold = web3.utils.toWei("1000");
    }
    if (network === "rinkeby") {
        genesisOwner = "0x44cB2688514B2D8f9f714F1d350c90A4e4b8e6Bd";
        threshold = web3.utils.toWei("10");
    }
    if (network === "ganache") {
        genesisOwner = accounts[1];
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
};
