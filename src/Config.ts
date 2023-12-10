export const config: any = {
  80001: {
    name: "Polygon Mumbai",
    chainId: 80001,
    rpcUrl: "http://",
    tokenContractAddress: "0xAa4fd77096922BE5540903C6FD892101Adeb34ce",
    pluginContractAddress: "0x022c6a6adfA225f625791CDE23f45Aa811e26469"
  },
  195: {
    name: "X1",
    chainId: 195,
    rpcUrl: "http://",
    tokenContractAddress: "0xAa4fd77096922BE5540903C6FD892101Adeb34ce",
    pluginContractAddress: "0x022c6a6adfA225f625791CDE23f45Aa811e26469"
  }
};

export const activeConfig = (chainId: any) => config[chainId];
