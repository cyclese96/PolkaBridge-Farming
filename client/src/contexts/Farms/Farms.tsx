import React, { useCallback, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'
import usePolkaBridge from '../../hooks/usePolkaBridge'

import { bnToDec } from '../../utils'
import { getMasterChefContract, getEarned } from '../../pbr/utils'
import { getFarms } from '../../pbr/utils'

import Context from './context'
import { Farm } from './types'

const Farms: React.FC = ({ children }) => {
  const [unharvested, setUnharvested] = useState(0)

  const pbr = usePolkaBridge()
  const { account } = useWallet()

  const farms = getFarms(pbr)

  return (
    <Context.Provider
      value={{
        farms,
        unharvested,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Farms
