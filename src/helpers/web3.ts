import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import contractABICom from "../constants/abi-com.json";
import contractABIDividend from "../constants/abi-dividend.json";
import { activeConfig } from "../Config";

const API_URL = `https://polygon-mumbai.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_API_KEY}`;
const web3 = createAlchemyWeb3(API_URL);

const chain: any = localStorage.getItem("chainId");
console.log(chain, "chain");
const contractAddressCom = activeConfig(chain?.id)?.tokenContractAddress;
const contractAddressDividend = activeConfig(chain?.id)?.pluginAddress;

export const comContract = new web3.eth.Contract(contractABICom, contractAddressCom);
export const dividendContract = new web3.eth.Contract(contractABIDividend, contractAddressDividend);

console.log(comContract, "comContract");

// const signer = provider.getSigner();
// const Contract = new ethers.Cont ract(Config.CREATOR_FUND.MUMBAI.CONTRACT_ADDRESS, Config.CREATOR_FUND.MUMBAI.ABI, signer);

export const getCurrentTotalSupply = async () => {
  const totalSupply = await dividendContract.methods.totalSupply().call();
  return totalSupply;
};

export const getCurrentTotalClaimedDividend = async () => {
  const totalClaimedDividend = await dividendContract.methods.totalClaimedDividend().call();
  return totalClaimedDividend;
};

export const getLedger = async (address: string) => {
  const ledger = await dividendContract.methods.ledger(address).call();
  return ledger;
};

export const hasUserClaimedDividend = async (address: string) => {
  const claimedDividend = await dividendContract.methods.claimedDividend(address).call();
  return claimedDividend;
};

export const setDividend = async (address: string, value: any) => {
  const claimedDividend = await dividendContract.methods.setDividend(1).send({ from: web3.utils.toChecksumAddress(address), value });
  return claimedDividend;
};

export const allocateShares = async (address: string, value: any, toAddress: any) => {
  const shares = await comContract.methods.mint(toAddress, value).send({ from: web3.utils.toChecksumAddress(address) });
  return shares;
};

export const addPlugin = async (address: string, pluginAddress: any) => {
  console.log(address, pluginAddress);

  const pluginAdded = await comContract.methods
    .addPlugin(web3.utils.toChecksumAddress(pluginAddress))
    .send({ from: web3.utils.toChecksumAddress(address) });
  return pluginAdded;
};

export const hasPlugin = async (address: string, pluginAddress: any) => {
  const pluginAdded = await comContract.methods.hasPlugin(web3.utils.toChecksumAddress(address), pluginAddress).call();
  return pluginAdded;
};
