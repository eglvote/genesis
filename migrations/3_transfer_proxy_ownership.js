const { admin } = require("@openzeppelin/truffle-upgrades");
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
        `Running ${ConsoleColors.MAGENTA} steps for ${ConsoleColors.MAGENTA} \n`, "TRANSFER PROXY ADMIN OWNERSHIP", network.toUpperCase()
    );

    let newProxyAdmin = "";
    if (network === "mainnet") {        
        newProxyAdmin = "0xe01Af1f67022439d267104A87343592c9429f3Bc";
    } else {
        newProxyAdmin = accounts[9];
    }

    try {
        await admin.transferProxyAdminOwnership(newProxyAdmin);
        console.log(
            `EGL Genesis Proxy Admin set to: ${ConsoleColors.YELLOW}`,
            newProxyAdmin
        );
    } catch {
        console.log(`Unable to transfer ownership of Genesis ProxyAdmin, this has probably already been transferred to: ${ConsoleColors.YELLOW}`, newProxyAdmin)
    }

};
