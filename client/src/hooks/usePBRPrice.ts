import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { Contract } from 'web3-eth-contract'
import {
  getMasterChefContract,
  getFarms,
  getLPValuePrice,
} from '../pbr/utils'
import usePolkaBridge from './usePolkaBridge'
import useBlock from './useBlock'
import axios from 'axios'
import config from '../config'

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
  const [price, setPrice] = useState(new BigNumber(0))
  const pbr = usePolkaBridge()
  const farms = getFarms(pbr)
  const masterChefContract = getMasterChefContract(pbr)
  const block = useBlock()

  const fetchStakedValue = useCallback(async () => {
    const balances: Array<StakedValue> = await Promise.all(
      farms.filter((e: any) => e.pid == DEFAULT_POOL_FOR_GET_PRICE).map(
        ({
          pid,
          lpContract,
          tokenContract,
          token2Contract
        }: {
          pid: number
          lpContract: Contract
          tokenContract: Contract
          token2Contract: Contract
        }) =>
          getLPValuePrice(
            masterChefContract,
            lpContract,
            tokenContract,
            token2Contract,
            pid,
          ),
      ),
    )

    setPrice(balances[0] && balances[0].price)
  }, [masterChefContract, block, pbr])

  useEffect(() => {
    if (masterChefContract && pbr) {
      fetchStakedValue()
    }
  }, [masterChefContract, block, setPrice, pbr])

  return price
}

export default usePBRPrice
