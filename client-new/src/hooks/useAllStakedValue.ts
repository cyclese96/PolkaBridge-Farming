import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'

import {
  getMasterChefContract,
  getFarms,
  getLPValue,
} from '../sushi/utils'
import useSushi from './useSushi'
import useBlock from './useBlock'
import axios from 'axios'
import config from '../config'
import usePBRPrice from './usePBRPrice'

export interface StakedValue {
  tokenAmount: BigNumber
  token2Amount: BigNumber
  totalToken2Value: BigNumber
  tokenPriceInToken2: BigNumber
  poolWeight: BigNumber
  usdValue: BigNumber
  pid: string
}

var CACHE : {time: any, old: any, value: any} = {
  time: 0,
  old: 0,
  value: []
}


const useAllStakedValue = () => {
  const [balances, setBalance] = useState(CACHE.value as Array<StakedValue>)
  const sushi = useSushi()
  const farms = getFarms(sushi)
  const pbrPrice = usePBRPrice()
  const masterChefContract = getMasterChefContract(sushi)
  const block = 0//useBlock()
  // console.log('pbrPrice: ', pbrPrice.toString())

  const fetchAllStakedValue = useCallback(async () => {
    const balances: Array<StakedValue> = await Promise.all(
      farms.map(
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
          getLPValue(
            masterChefContract,
            lpContract,
            tokenContract,
            token2Contract,
            pid,
            pbrPrice
          ),
      ),
    )
    setBalance(balances)
  }, [masterChefContract, sushi, pbrPrice])

  useEffect(() => {
    if (masterChefContract && sushi && pbrPrice) {
      fetchAllStakedValue()
    }
  }, [block, masterChefContract, setBalance, sushi, pbrPrice])

  return balances
}

export default useAllStakedValue
