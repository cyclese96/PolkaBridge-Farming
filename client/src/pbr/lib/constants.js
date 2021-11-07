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


// TODO: change the address & set LP pool
export const contractAddresses = {
  pbr: {
    1: '0x298d492e8c1d909d3f63bc4a36c66c64acb3d695', // pbr token
    4: '0xebca1a8010c16cdc4a10c7f3035b709cb992cd1f'
  },
  masterChef: {
    1: '0x75B8c48Bdb04d426aeD57b36BB835aD2dC321c30',
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
      1: '0xCb37b0027858796ce60ECCe4B54C45afdfF02Aca',
      4: '0x4105b114634dd5ac07a4fbf5bd3925932fcc6e0d',
    },
    tokenAddresses: {
      1: '0x298d492e8c1d909d3f63bc4a36c66c64acb3d695',
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
    addLiquidityLink: 'https://app.uniswap.org/#/add/v2/ETH/0x298d492e8c1d909D3F63Bc4A36C66c64ACB3d695',
    removeLiquidityLink: 'https://app.uniswap.org/#/remove/v2/0x298d492e8c1d909d3f63bc4a36c66c64acb3d695/ETH',
    poolWeight: 40
  },
  // {
  //   pid: 1,
  //   lpAddresses: {
  //     1: '0xdaef1026b0c63eed3b2b86af396d724ddb9dcd18',
  //     4: '0xa53b0f8ff7e9c9d7b8382ee3501a08b50ab43e9f',
  //   },
  //   tokenAddresses: {
  //     1: '0x44f262622248027f8E2a8Fb1090c4Cf85072392C',
  //     4: '0x2bd3c79908cdf4657136c52f9dca3f1d7e81dd9e',
  //   },
  //   token2Addresses: {
  //     1: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  //     4: '0xc778417e063141139fce010982780140aa0cd5ab'
  //   },
  //   name: 'XIV - ETH',
  //   symbol: 'XIV-ETH LP',
  //   symbolShort: 'XIV-ETH',
  //   description: `Deposit XIV-ETH LP Earn PBR`,
  //   tokenSymbol: 'XIV',
  //   token2Symbol: 'ETH',
  //   icon: '/img/tokens/xiv.png',
  //   icon2: '/img/tokens/eth.png',
  //   isHot: true,
  //   isNew: true,
  //   isSoon: false,
  //   isActived: true,
  //   protocal: 'Uniswap',
  //   iconProtocal: '/img/tokens/pbr.png',
  //   pairLink: '/',
  //   addLiquidityLink: 'https://app.uniswap.org/#/add/0x44f262622248027f8E2a8Fb1090c4Cf85072392C/ETH',
  //   removeLiquidityLink: 'https://app.uniswap.org/#/remove/0x44f262622248027f8E2a8Fb1090c4Cf85072392C/ETH',
  //   poolWeight: 2
  // },
  {
    pid: 2,
    lpAddresses: {
      1: '0x3041cbd36888becc7bbcbc0045e3b1f144466f5f',
      4: '0x3041cbd36888becc7bbcbc0045e3b1f144466f5f',
    },
    tokenAddresses: {
      1: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      4: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    },
    token2Addresses: {
      1: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      4: '0xdac17f958d2ee523a2206206994597c13d831ec7'
    },
    name: 'USDC - USDT',
    symbol: 'USDC-USDT LP',
    symbolShort: 'USDC-USDT',
    description: `Deposit USDC-USDT LP Earn PBR`,
    tokenSymbol: 'USDC',
    token2Symbol: 'USDT',
    icon: '/img/tokens/usdc.png',
    icon2: '/img/tokens/usdt.png',
    isHot: true,
    isNew: true,
    isSoon: false,
    isActived: true,
    protocal: 'Uniswap',
    iconProtocal: '/img/tokens/pbr.png',
    pairLink: '/',
    addLiquidityLink: 'https://app.uniswap.org/#/add/v2/0xdAC17F958D2ee523a2206206994597C13D831ec7/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    removeLiquidityLink: 'https://app.uniswap.org/#/remove/v2/0xdAC17F958D2ee523a2206206994597C13D831ec7/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    poolWeight: 2
  }
]
