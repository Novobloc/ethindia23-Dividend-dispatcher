export const config: any = {
  80001: {
    name: "Polygon Mumbai",
    chainId: 80001,
    rpcUrl: "http://",
    tokenContractAddress: "0x4CD37E6cFf2720B85bE07bABd7438EA72c9F6E57",
    pluginContractAddress: "0x235Ae9aAE2D5D62223807fF229907cE02fE67B6b"
  },
  195: {
    name: "X1",
    chainId: 195,
    rpcUrl: "http://",
    tokenContractAddress: "0x4CD37E6cFf2720B85bE07bABd7438EA72c9F6E57",
    pluginContractAddress: "0x235Ae9aAE2D5D62223807fF229907cE02fE67B6b"
  }
};

const activeConfig = (chainId: any) => config[chainId];
