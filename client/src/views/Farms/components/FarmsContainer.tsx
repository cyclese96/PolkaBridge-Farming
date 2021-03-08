import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { useWallet } from 'use-wallet'

import Logo from '../../../assets/img/balance.png'

import Button from '../../../components/Button'
import Page from '../../../components/Page'
import PageHeader from '../../../components/PageHeader'
import WalletProviderModal from '../../../components/WalletProviderModal'

import useModal from '../../../hooks/useModal'

import Farm from '../../Farm'

import FarmCards from './FarmCards'


const FarmsContainer: React.FC = () => {
  const { path } = useRouteMatch()
  // const { account } = useWallet()
  // const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)

  return <>
    <Route exact path={path}>
      <PageHeader
        icon={<img src={Logo} height="120" />}
        subtitle="Earn PBR tokens by staking PolkaBridge SPL Tokens."
        title="Select Your Favorite Dishes"
      />
      <FarmCards />
    </Route>
    <Route path={`${path}/:farmId`}>
      <Farm />
    </Route>
  </>
}

export default FarmsContainer
