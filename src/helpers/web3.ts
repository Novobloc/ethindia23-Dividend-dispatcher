import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import contractABICom from "../constants/abi-com.json";
import contractABIDividend from "../constants/abi-dividend.json";

const API_URL = `https://polygon-mumbai.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_API_KEY}`;
const web3 = createAlchemyWeb3(API_URL);

const contractAddressCom = "0x4CD37E6cFf2720B85bE07bABd7438EA72c9F6E57";
const contractAddressDividend = "0x235Ae9aAE2D5D62223807fF229907cE02fE67B6b";

export const comContract = new web3.eth.Contract(contractABICom, contractAddressCom);
export const dividendContract = new web3.eth.Contract(contractABIDividend, contractAddressDividend);

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
