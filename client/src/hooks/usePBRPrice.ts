import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { Contract } from 'web3-eth-contract'
import {
  getMasterChefContract,
  getFarms,
  getPBRPrice,
  getUniswapETHPBRPair,
  getLPAddress
} from '../pbr/utils'
import usePolkaBridge from './usePolkaBridge'
import useBlock from './useBlock'
import { setInterval } from 'node:timers'


export interface StakedValue {
  tokenAmount: BigNumber
  token2Amount: BigNumber
  totalToken2Value: BigNumber
  tokenPriceInToken2: BigNumber
  poolWeight: BigNumber
  usdValue: BigNumber
  pid: string,
  price: BigNumber
}

const DEFAULT_POOL_FOR_GET_PRICE = 0

const usePBRPrice = () => {
  const [price, setPrice] = useState<BigNumber>(new BigNumber(0))
  const pbr = usePolkaBridge()
  const farms = getFarms(pbr)
  const uniswapETHPBRPair = getUniswapETHPBRPair(pbr);
  const lpAddress = getLPAddress(pbr);

  const fetchPBRPrice = useCallback(async () => {
    const price = await getPBRPrice(
      uniswapETHPBRPair,
      lpAddress
    )
    setPrice(price)
  }, [])

  useEffect(() => {
    if (pbr) {
      fetchPBRPrice()
    }
  }, [pbr])

  return price
}

export default usePBRPrice
