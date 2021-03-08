import {useCallback} from 'react'

import usePolkaBridge from './usePolkaBridge'
import {useWallet} from 'use-wallet'

import {makerConvert, getMakerContract} from '../pbr/utils'

const useConvert = () => {
  const {account} = useWallet()
  const pbr = usePolkaBridge()
  const handle = useCallback(
    async (token0: string, token1: string) => {
      const txHash = await makerConvert(
        getMakerContract(pbr),
        token0,
        token1,
        account,
      )
      console.log(txHash)
    },
    [account, pbr],
  )

  return {onConvert: handle}
}

export default useConvert
