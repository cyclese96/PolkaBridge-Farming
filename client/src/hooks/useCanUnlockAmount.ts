import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getCanUnlockPBR, getEarned, getMasterChefContract } from '../pbr/utils'
import usePolkaBridge from './usePolkaBridge'
import useBlock from './useBlock'

const useCanUnlockAmount = () => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
  const pbr = usePolkaBridge()
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getCanUnlockPBR(pbr, account)
    setBalance(balance)
  }, [account, pbr])

  useEffect(() => {
    if (account && pbr) {
      fetchBalance()
    }
  }, [account, block, setBalance, pbr])

  return balance
}

export default useCanUnlockAmount
