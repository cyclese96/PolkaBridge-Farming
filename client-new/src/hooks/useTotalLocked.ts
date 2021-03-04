import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'

import { getTotalUserLocked, getMasterChefContract } from '../sushi/utils'
import useSushi from './useSushi'

const useTotalLocked = () => {
  const [totalLocked, setTotalLocked] = useState(new BigNumber(0))
  const { account }: { account: string; ethereum: provider } = useWallet()
  const sushi = useSushi()
  const masterChefContract = getMasterChefContract(sushi)
  const fetchTokenLocked = useCallback(async () => {
    const totalLocked = await getTotalUserLocked(masterChefContract, account)
    setTotalLocked(new BigNumber(totalLocked))
  }, [masterChefContract, account])

  useEffect(() => {
    if (account && masterChefContract) {
      fetchTokenLocked()
    }
  }, [masterChefContract, setTotalLocked, account])

  return totalLocked
}

export default useTotalLocked
