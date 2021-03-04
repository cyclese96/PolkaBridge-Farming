import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'

import { getTotalLocked, getMasterChefContract } from '../sushi/utils'
import useSushi from './useSushi'

const useTokenLocked = () => {
  const [totalLocked, setTotalLocked] = useState(new BigNumber(0))
  const sushi = useSushi()
  const masterChefContract = getMasterChefContract(sushi)
  const fetchTokenLocked = useCallback(async () => {
    const totalLocked = await getTotalLocked(masterChefContract)
    setTotalLocked(new BigNumber(totalLocked))
  }, [masterChefContract])

  useEffect(() => {
    if (masterChefContract) {
      fetchTokenLocked()
    }
  }, [masterChefContract, setTotalLocked])

  return totalLocked
}

export default useTokenLocked
