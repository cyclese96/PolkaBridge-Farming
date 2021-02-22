import BigNumber from 'bignumber.js/bignumber'

export const SUBTRACT_GAS_LIMIT = 100000
export const START_REWARD_AT_BLOCK = 3525595 // TODO
export const NUMBER_BLOCKS_PER_YEAR = 10512000

export const START_NEW_POOL_AT = 1609255800 // 2020/12/29 22h30

const ONE_MINUTE_IN_SECONDS = new BigNumber(60)
const ONE_HOUR_IN_SECONDS = ONE_MINUTE_IN_SECONDS.times(60)
const ONE_DAY_IN_SECONDS = ONE_HOUR_IN_SECONDS.times(24)
const ONE_YEAR_IN_SECONDS = ONE_DAY_IN_SECONDS.times(365)

export const INTEGERS = {
  ONE_MINUTE_IN_SECONDS,
  ONE_HOUR_IN_SECONDS,
  ONE_DAY_IN_SECONDS,
  ONE_YEAR_IN_SECONDS,
  ZERO: new BigNumber(0),
  ONE: new BigNumber(1),
  ONES_31: new BigNumber('4294967295'), // 2**32-1
  ONES_127: new BigNumber('340282366920938463463374607431768211455'), // 2**128-1
  ONES_255: new BigNumber(
    '115792089237316195423570985008687907853269984665640564039457584007913129639935',
  ), // 2**256-1
  INTEREST_RATE_BASE: new BigNumber('1e18'),
}

export const addressMap = {
  uniswapFactory: '0xc0a47dFe034B400B47bDaD5FecDa2621de6c4d95',
  uniswapFactoryV2: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
  YFI: '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e',
  YCRV: '0xdF5e0e81Dff6FAF3A7e52BA697820c5e32D806A8',
  UNIAmpl: '0xc5be99a02c6857f9eac67bbce58df5572498f40c',
  WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  UNIRouter: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
  LINK: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
  MKR: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
  SNX: '0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F',
  COMP: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
  LEND: '0x80fB784B7eD66730e8b1DBd9820aFD29931aab03',
  SUSHIYCRV: '0x2C7a51A357d5739C5C74Bf3C96816849d2c9F726',
}

// TODO: change the address & set LP pool
export const contractAddresses = {
  sushi: {
    1: '0x0d6ae2a429df13e44a07cd2969e085e4833f64a0', // pbr token
    5: '0xEFceA9c937D8a4c91244F16dBA188C33F27A7Dba'
  },
  maker: {
    1: '0xaE263b54D1118A8f0f8c769d443cB8154b91970e',
    5: '0xaE263b54D1118A8f0f8c769d443cB8154b91970e'
  },
  // masterChef: {
  //   1: '0x1070B9a998C4457C5f393e389F275012e91b31d2',
  //   5: '0xcd2C0263f2dE95385A34741cC20f794b17e24121'
  // },
  weth: {
    1: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    5: '0xb7e94cce902e34e618a23cb82432b95d03096146' // weth
  }
}

export const supportedPools = [
  {
    pid: 0,
    lpAddresses: {
      1: '0xa32a983a64ce21834221aa0ad1f1533907553136',
      5: '0xfbAC427F266dcd0d963c080d9Eb1149B5dD28aeC',
    },
    tokenAddresses: {
      1: '0x0d6ae2a429df13e44a07cd2969e085e4833f64a0',
      5: '0xEFceA9c937D8a4c91244F16dBA188C33F27A7Dba',
    },
    token2Addresses: {
      1: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
      5: '0xae13d989dac2f0debff460ac112a837c89baa7cd'
    },
    name: 'PBR - ETH',
    symbol: 'PBR-WETH LP',
    symbolShort: 'PBR-WETH',
    description: `Deposit PBR-WETH LP Earn PBR`,
    tokenSymbol: 'PBR',
    token2Symbol: 'WETH',
    icon: '/img/tokens/pbr.png',
    icon2: '/img/tokens/eth.png',
    isHot: true,
    isNew: true,
    isSoon: false,
    protocal: 'Uniswap',
    iconProtocal: '/img/tokens/pbr.png',
    pairLink: '/',
    addLiquidityLink: 'https://app.uniswap.org/#/add/0x0d6ae2a429df13e44a07cd2969e085e4833f64a0/ETH',
    removeLiquidityLink: 'https://app.uniswap.org/#/remove/0x0d6ae2a429df13e44a07cd2969e085e4833f64a0/ETH'
  },
  {
    pid: 1,
    lpAddresses: {
      1: '0x20781bc3701c5309ac75291f5d09bdc23d7b7fa8',
      5: '0xfbAC427F266dcd0d963c080d9Eb1149B5dD28aeC',
    },
    tokenAddresses: {
      1: '0x0d6ae2a429df13e44a07cd2969e085e4833f64a0',
      5: '0x275a770546e6e0b4ee7259aa6a26be66981b42c6',
    },
    token2Addresses: {
      1: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
      5: '0xae13d989dac2f0debff460ac112a837c89baa7cd'
    },
    name: 'PBR - USDC',
    symbol: 'PBR-USDC LP',
    symbolShort: 'PBR-USDC',
    description: `Deposit PBR-USDC LP Earn PBR`,
    tokenSymbol: 'PBR',
    token2Symbol: 'USDC',
    icon: '/img/tokens/pbr.png',
    icon2: '/img/tokens/usdc.png',
    isHot: true,
    isNew: false,
    isSoon: true,
    protocal: 'PolkaBridge',
    iconProtocal: '/img/tokens/pbr.png',
    pairLink: '/',
    addLiquidityLink: 'https://swapv1.polkabridge.org/#/add/0x0d6ae2a429df13e44a07cd2969e085e4833f64a0/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    removeLiquidityLink: 'https://swapv1.polkabridge.org/#/remove/0x0d6ae2a429df13e44a07cd2969e085e4833f64a0/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'
  },
  {
    pid: 2,
    lpAddresses: {
      1: '0xeb0bab8f337ea2053457decce15e93005b59326a'
    },
    tokenAddresses: {
      1: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82'
    },
    token2Addresses: {
      1: '0x0d6ae2a429df13e44a07cd2969e085e4833f64a0'
    },
    name: 'PBR - USDT',
    symbol: 'PBR-USDT LP',
    symbolShort: 'PBR-USDT',
    description: `Deposit PBR-USDT LP Earn PBR`,
    tokenSymbol: 'PBR',
    token2Symbol: 'USDT',
    icon: '/img/tokens/pbr.png',
    icon2: '/img/tokens/usdt.png',
    isHot: true,
    isNew: false,
    isSoon: true,
    protocal: 'PolkaBridge',
    iconProtocal: '/img/tokens/pbr.png',
    pairLink: '/',
    addLiquidityLink: 'https://swapv1.polkabridge.org/#/add/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82/0x5Ac52EE5b2a633895292Ff6d8A89bB9190451587',
    removeLiquidityLink: 'https://swapv1.polkabridge.org/#/remove/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82/0x5Ac52EE5b2a633895292Ff6d8A89bB9190451587'
  },
]
// .map(e => {
//   if (
//     ['0x239E37485B13F873ac9D5D8D7eC3C8cC1b3Ab0C7']
//     .indexOf(e.lpAddresses[97].toLowerCase()) >= 0)
//     {
//       e.isHot = false
//       e.isNew = true
//     }
//     else {
//       e.isHot = true
//       e.isNew = false
//     }

//     return e;
// })
.sort((a, b) => (a.isNew ? -1 : 1) - (b.isNew ? -1 : 1) )
