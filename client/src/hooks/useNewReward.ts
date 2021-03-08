import { useCallback, useEffect, useState } from 'react'
import Web3 from 'web3'
import { provider } from 'web3-core'
import { useWallet } from 'use-wallet'
import config from '../config'
import usePolkaBridge from './usePolkaBridge'
import { getNewRewardPerBlock } from '../pbr/utils'
import BigNumber from 'bignumber.js'
// import debounce from 'debounce'

var CACHE : any = {}

const useNewReward = (pid1 = 0) => {
  CACHE[pid1] = CACHE[pid1] || {
    time: 0,
    old: 10 * 60 * 1000,
    value: new BigNumber(0)
  }
  const pbr = usePolkaBridge()
  const [newReward, setNewRewad] = useState<BigNumber>(CACHE[pid1].value)
  
  useEffect(() => {
    async function fetchData() {
      const v = await getNewRewardPerBlock(pbr, pid1)
      CACHE[pid1].time = new Date().getTime()
      CACHE[pid1].value = v;

      localStorage.setItem(`CACHE_useNewReward${pid1}_time`, CACHE.time)
      localStorage.setItem(`CACHE_useNewReward${pid1}_value`, CACHE.value)
      setNewRewad(v)
    }
    if (pbr 
      && CACHE[pid1].time + CACHE[pid1].old <= new Date().getTime()) {
      fetchData()
    }
  }, [pbr, setNewRewad])

  return newReward
}

export default useNewReward
