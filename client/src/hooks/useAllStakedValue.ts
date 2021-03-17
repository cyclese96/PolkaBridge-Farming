import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'

import {
  getMasterChefContract,
  getFarms,
  getLPValue,
} from '../pbr/utils'
import usePolkaBridge from './usePolkaBridge'
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
  totalRewardsClaimed: BigNumber
}




const useAllStakedValue = () => {
  const [balances, setBalance] = useState<Array<StakedValue>>([])
  const pbr = usePolkaBridge()
  const farms = getFarms(pbr)
  const pbrPrice = usePBRPrice()
  const masterChefContract = getMasterChefContract(pbr)

  //console.log('pbrPrice: ', pbrPrice.toString())

  const fetchAllStakedValue = useCallback(async () => {
    const balances: Array<StakedValue> = await Promise.all(
      farms.map(
        ({
          pid,
          lpContract,
          tokenContract,
          token2Contract,
          tokenSymbol,
          token2Symbol,
          isActived,
          poolWeight
        }: {
          pid: number
          lpContract: Contract
          tokenContract: Contract
          token2Contract: Contract,
          tokenSymbol: any
          token2Symbol: any,
          isActived: any,
          poolWeight: BigNumber
        }) =>
          getLPValue(
            masterChefContract,
            lpContract,
            tokenContract,
            token2Contract,
            pid,
            pbrPrice,
            tokenSymbol,
            token2Symbol,
            isActived,
            poolWeight
          )
      ),
    )

    setBalance(balances)

  }, [masterChefContract, pbr, pbrPrice])

  useEffect(() => {
    if (masterChefContract && pbr && pbrPrice) {
      fetchAllStakedValue()

    }
  }, [masterChefContract, setBalance, pbr, pbrPrice])

  return balances
}

export default useAllStakedValue
