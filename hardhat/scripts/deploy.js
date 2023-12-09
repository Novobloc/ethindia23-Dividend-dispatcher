const { ethers } = require("hardhat");

async function main() {
    const ERC20_PLUGINS_GASLIMIT = 500000;

    const DelegatedShare = await ethers.getContractFactory("DelegatedShare");
    const erc20Plugins = await DelegatedShare.deploy(
        "DelegatedShare",
        "EPM",
        5,
        ERC20_PLUGINS_GASLIMIT
    );

    await erc20Plugins.waitForDeployment();

    console.log(`DelegatedShare deployed to ${erc20Plugins.target}`);

    await erc20Plugins.waitForDeployment();
    const DelegationPlugin = await ethers.getContractFactory(
        "DelegationPlugin"
    );
    const delegationPlugin = await DelegationPlugin.deploy(
        "basic1INCH",
        "basic1INCH",
        erc20Plugins
    );
    await delegationPlugin.waitForDeployment();
    console.log("delegationPlugin: ", delegationPlugin.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
