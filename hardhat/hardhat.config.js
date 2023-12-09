require("@nomicfoundation/hardhat-ethers");
require("@nomicfoundation/hardhat-verify");
require("@nomicfoundation/hardhat-chai-matchers");
require("solidity-coverage");
require("hardhat-dependency-compiler");
require("hardhat-deploy");
require("hardhat-gas-reporter");
require("dotenv").config();

// const { etherscan } = require('./hardhat.networks');

module.exports = {
    etherscan:{
        apiKey: "T5Z532NYIYCGVB465P72DFYT96MYPHEH9T",
    
    },
    solidity: {
        version: "0.8.19",
        settings: {
            optimizer: {
                enabled: true,
                runs: 1000000,
            },
            viaIR: true,
        },
    },
    networks: {
        polygonmumbai: {
            url: "https://rpc-mumbai.maticvigil.com",
            accounts: [
                process.env.PRIVATE_KEY,
            ],
        },
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
    },
    gasReporter: {
        enable: true,
        currency: "USD",
    },
};
