import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { Contract } from 'web3-eth-contract'

import {
  getMasterChefContract,
  getFarms,
  getLPValue,
} from '../pbr/utils'
import usePolkaBridge from './usePolkaBridge'

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

const useStakedValue = (pid: number) => {
  const [balance, setBalance] = useState<StakedValue>()
  const pbr = usePolkaBridge()
  const farms = getFarms(pbr)
  const pbrPrice = usePBRPrice()

  const masterChefContract = getMasterChefContract(pbr)

  const fetchStakedValue = useCallback(async () => {
    const balances: Array<StakedValue> = await Promise.all(
      farms.filter((e: any) => e.pid == pid).map(
        ({
          pid,
          lpContract,
          tokenContract,
          token2Contract,
          tokenASymbol,
          tokenBSymbol,
          isActived
        }: {
          pid: number
          lpContract: Contract
          tokenContract: Contract
          token2Contract: Contract
          tokenASymbol: any
          tokenBSymbol: any
          isActived: any
        }) =>
          getLPValue(
            masterChefContract,
            lpContract,
            tokenContract,
            token2Contract,
            pid,
            pbrPrice,
            tokenASymbol,
            tokenBSymbol,
            isActived
          ),
      ),
    )
    setBalance(balances[0])
  }, [masterChefContract, pbr, pbrPrice])

  useEffect(() => {
    if (masterChefContract && pbr && pbrPrice) {
      fetchStakedValue()
    }
  }, [masterChefContract, setBalance, pbr, pbrPrice])
  return balance
}

export default useStakedValue
