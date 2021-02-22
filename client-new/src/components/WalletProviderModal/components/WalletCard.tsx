import React from 'react'
import Button from '../../Button'
import Card from '../../Card'
import CardContentWallet from '../../CardContentWallet'
import CardIcon from '../../CardIcon'
import CardTitle from '../../CardTitle'
import Spacer from '../../Spacer'

interface WalletCardProps {
  icon: React.ReactNode
  onConnect: () => void
  title: string
}

const WalletCard: React.FC<WalletCardProps> = ({ icon, onConnect, title }) => (
  <Card>
    <CardContentWallet>
      <CardIcon>{icon}</CardIcon>
      <CardTitle text={title} />
      <Spacer />
      <Button onClick={onConnect} text="Connect" />
    </CardContentWallet>
  </Card>
)

export default WalletCard
