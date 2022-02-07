// export default {
//   // rpc: 'https://rinkeby.infura.io/v3/6f0ba6da417340e6b1511be0f2bc389b',
//   // chainId: 4,
//   rpc: 'https://mainnet.infura.io/v3/6f0ba6da417340e6b1511be0f2bc389b',
//   chainId: 1,
//   api: 'http://localhost:8020',
//   coingecko: "https://api.coingecko.com/api"
//   // rpc: 'https://mainnet.infura.io/v3/undefined',
//   // chainId: 1,
//   // api: 'https://api1.polkabridge.org/api'
// }

export default {
  // rpc: 'https://rinkeby.infura.io/v3/8bcf728cb2074a07a3f3d8069cf8c855',
  // chainId: 4,
  rpc: `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_KEY.split(
    '',
  )
    .reverse()
    .join('')}`,
  ankrEthereumRpc: 'https://rpc.ankr.com/eth',
  chainId: 1,
  chainIdTestnet: 42,
  bscChain: 56,
  bscChainTestent: 97,
  bscRpcTestnet: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
  bscRpcMainnet: 'https://bsc-dataseed.binance.org/',
  api: 'http://localhost:8020',
  coingecko: 'https://api.coingecko.com/api',
  // bscChain: 97,
}
