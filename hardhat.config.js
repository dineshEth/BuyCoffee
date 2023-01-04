require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
const {PRIVATE_KEY, ALCHEMY_URI } = process.env;

module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "polygon",
  networks: {
    hardhat: {},
    polygon: {
      url: ALCHEMY_URI,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
};


// smart contract deployed on polygon mumbai : 0x2FC3c28BFd3968397DD114197172458fc0fd5135
