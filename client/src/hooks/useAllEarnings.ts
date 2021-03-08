import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getMasterChefContract, getFarms, checkPoolActive } from '../pbr/utils'
import usePolkaBridge from './usePolkaBridge'
import useBlock from './useBlock'

import config from '../config'
import axios from 'axios'


const useAllEarnings = () => {
  const [balances, setBalance] = useState([] as Array<BigNumber>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const pbr = usePolkaBridge()
  const farms = getFarms(pbr)
  const masterChefContract = getMasterChefContract(pbr)
  const block = 0//useBlock()

  const fetchAllBalances = useCallback(async () => {
    // const balances: Array<BigNumber> = await Promise.all(
    //   farms.map(({ pid }: { pid: number }) =>
    //     getEarned(masterChefContract, pid, account),
    //   ),
    // )
    // setBalance(balances)

    const data: Array<BigNumber> = await Promise.all(
      farms.map(({ pid }: any) => new Promise(async (resolve) => {
        if (await checkPoolActive(pid)) {
          const earned = await getEarned(masterChefContract, pid, account)
          resolve(earned)
        }
        else {
          resolve("0")
        }

      }))
    )

    setBalance(data)
  }, [account, masterChefContract, pbr])

  useEffect(() => {
    if (account && masterChefContract && pbr) {
      fetchAllBalances()
    }
  }, [account, block, masterChefContract, setBalance, pbr])

  return balances
}

export default useAllEarnings
