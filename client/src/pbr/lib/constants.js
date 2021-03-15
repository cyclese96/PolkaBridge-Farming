import BigNumber from 'bignumber.js/bignumber'

export const SUBTRACT_GAS_LIMIT = 100000
export const START_REWARD_AT_BLOCK = 3525595 // TODO
export const NUMBER_BLOCKS_PER_YEAR = 2800000 // ~7500 block/day

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
  PBRYCRV: '0x2C7a51A357d5739C5C74Bf3C96816849d2c9F726',
}

// TODO: change the address & set LP pool
export const contractAddresses = {
  pbr: {
    1: '0xebca1a8010c16cdc4a10c7f3035b709cb992cd1f', // pbr token
    4: '0xebca1a8010c16cdc4a10c7f3035b709cb992cd1f'
  },
  masterChef: {
    1: '0xfEfD5a6aD8407a7582A7207E3095dBbcec7CBE9E',
    4: '0xfEfD5a6aD8407a7582A7207E3095dBbcec7CBE9E' // farming contract
  },
  weth: {
    1: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    4: '0xc778417e063141139fce010982780140aa0cd5ab' // weth
  }
}

export const supportedPools = [
  {
    pid: 0,
    lpAddresses: {
      1: '0x4105b114634dd5ac07a4fbf5bd3925932fcc6e0d',
      4: '0x4105b114634dd5ac07a4fbf5bd3925932fcc6e0d',
    },
    tokenAddresses: {
      1: '0x1a5f432D94F5317e2D29A432cf30d51f4aa58094',
      4: '0xebca1a8010c16cdc4a10c7f3035b709cb992cd1f',
    },
    token2Addresses: {
      1: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      4: '0xc778417e063141139fce010982780140aa0cd5ab'
    },
    name: 'PBR - ETH',
    symbol: 'PBR-ETH LP',
    symbolShort: 'PBR-ETH',
    description: `Deposit PBR-ETH LP Earn PBR`,
    tokenSymbol: 'PBR',
    token2Symbol: 'ETH',
    icon: '/img/tokens/pbr.png',
    icon2: '/img/tokens/eth.png',
    isHot: true,
    isNew: true,
    isSoon: false,
    isActived: true,
    protocal: 'Uniswap',
    iconProtocal: '/img/tokens/pbr.png',
    pairLink: '/',
    addLiquidityLink: 'https://app.uniswap.org/#/add/0xebca1a8010c16cdc4a10c7f3035b709cb992cd1f/ETH',
    removeLiquidityLink: 'https://app.uniswap.org/#/remove/0xebca1a8010c16cdc4a10c7f3035b709cb992cd1f/ETH'
  },
  {
    pid: 2,
    lpAddresses: {
      1: '0xdaef1026b0c63eed3b2b86af396d724ddb9dcd18',
      4: '0xa53b0f8ff7e9c9d7b8382ee3501a08b50ab43e9f',
    },
    tokenAddresses: {
      1: '0x44f262622248027f8E2a8Fb1090c4Cf85072392C',
      4: '0x2bd3c79908cdf4657136c52f9dca3f1d7e81dd9e',
    },
    token2Addresses: {
      1: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      4: '0xc778417e063141139fce010982780140aa0cd5ab'
    },
    name: 'XIV - ETH',
    symbol: 'XIV-ETH LP',
    symbolShort: 'XIV-ETH',
    description: `Deposit XIV-ETH LP Earn PBR`,
    tokenSymbol: 'XIV',
    token2Symbol: 'ETH',
    icon: '/img/tokens/xiv.png',
    icon2: '/img/tokens/eth.png',
    isHot: true,
    isNew: true,
    isSoon: false,
    isActived: true,
    protocal: 'Uniswap',
    iconProtocal: '/img/tokens/pbr.png',
    pairLink: '/',
    addLiquidityLink: 'https://app.uniswap.org/#/add/0x44f262622248027f8E2a8Fb1090c4Cf85072392C/ETH',
    removeLiquidityLink: 'https://app.uniswap.org/#/remove/0x44f262622248027f8E2a8Fb1090c4Cf85072392C/ETH'
  },
  {
    pid: 3,
    lpAddresses: {
      1: '0x2d9fd51e896ff0352cb6d697d13d04c2cb85ca83',
      4: '0x7afc6660cb9f889893dd4482a8b5fb8b2f10cc2b',
    },
    tokenAddresses: {
      1: '0x8b0e42f366ba502d787bb134478adfae966c8798',
      4: '0x0dea042152bd61d49d64f307e9ef6f66ee424b9c',
    },
    token2Addresses: {
      1: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      4: '0xc778417e063141139fce010982780140aa0cd5ab'
    },
    name: 'LABS - ETH',
    symbol: 'LABS-ETH LP',
    symbolShort: 'LABS-ETH',
    description: `Deposit LABS-ETH LP Earn PBR`,
    tokenSymbol: 'LABS',
    token2Symbol: 'ETH',
    icon: '/img/tokens/labs.png',
    icon2: '/img/tokens/eth.png',
    isHot: true,
    isNew: true,
    isSoon: false,
    isActived: true,
    protocal: 'Uniswap',
    iconProtocal: '/img/tokens/pbr.png',
    pairLink: '/',
    addLiquidityLink: 'https://app.uniswap.org/#//add/0xebca1a8010c16cdc4a10c7f3035b709cb992cd1f/ETH',
    removeLiquidityLink: 'https://app.uniswap.org/#//remove/0xebca1a8010c16cdc4a10c7f3035b709cb992cd1f/ETH'
  },
]
