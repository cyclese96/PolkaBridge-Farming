export default {
  // chainId: 4,
  rpc: `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_KEY.split('').reverse().join('')}`,
  chainId: 1,
  api: 'http://localhost:8020',
  coingecko: "https://api.coingecko.com/api"
  // rpc: 'https://mainnet.infura.io/v3/undefined',
  // chainId: 1,
  // api: 'https://api1.polkabridge.org/api'
}
