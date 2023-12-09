const { ethers } = require("hardhat");

async function main() {
    const ERC20_PLUGINS_GASLIMIT = 500000;

    const CompanyStock = await ethers.getContractFactory("CompanyStock");
    const erc20Plugins = await CompanyStock.deploy(
        "CompanyStock",
        "COM",
        5,
        ERC20_PLUGINS_GASLIMIT
    );

    await erc20Plugins.waitForDeployment();

    console.log(`CompanyStock deployed to ${erc20Plugins.target}`);

    await erc20Plugins.waitForDeployment();
    const DividendDispatcherPlugin = await ethers.getContractFactory(
        "DividendDispatcherPlugin"
    );
    const dividendDispatcherPlugin = await DividendDispatcherPlugin.deploy(
        "DividendDispatcher",
        "DDP",
        erc20Plugins
    );
    await dividendDispatcherPlugin.waitForDeployment();
    console.log("DividendDispatcherPlugin is deployed to : ", dividendDispatcherPlugin.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
