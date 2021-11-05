import React, { useEffect, useState, useMemo } from 'react'
import styled from 'styled-components'
import { StringLiteral } from 'typescript'
import { useWallet } from 'use-wallet'
import usePolkaBridge from '../../../hooks/usePolkaBridge'
import { BigNumber } from '../../../pbr'
import { getLPTokenStaked, getNewRewardPerBlock } from '../../../pbr/utils'
import { getContract } from '../../../utils/erc20'
import { provider } from 'web3-core'
import { getBalanceNumber } from '../../../utils/formatBalance'
import useBlock from '../../../hooks/useBlock'
import useStakedValue from '../../../hooks/useStakedValue'
import { NUMBER_BLOCKS_PER_YEAR } from '../../../pbr/lib/constants'
import usePBRPrice from '../../../hooks/usePBRPrice'
import useNewReward from '../../../hooks/useNewReward'
import Web3 from "web3"
interface ApyProps {
    pid: number
    lpTokenAddress: string
    symbolShort: string
    tokenSymbol: string
    token2Symbol: string
}

const Apy: React.FC<ApyProps> = ({ pid, lpTokenAddress, symbolShort, tokenSymbol, token2Symbol }) => {
    const pbr = usePolkaBridge()
    const { ethereum } = useWallet()

  
    const stakedValue = useStakedValue(pid)
    const pbrPrice = usePBRPrice()

    const lpContract = useMemo(() => {
      return getContract(ethereum as provider, lpTokenAddress)
    }, [ethereum, lpTokenAddress])

    const newReward = useNewReward(pid)
    const [totalStake, setTotalStake] = useState<BigNumber>()

    useEffect(() => {
        async function fetchData() {
            const data = await getLPTokenStaked(pbr, lpContract)
            setTotalStake(data)
        }
        if (pbr && lpContract) {
            fetchData()
        }
    }, [pbr, setTotalStake, lpContract])

    return (
        <StyledApy>
            <StyledBox className="col-3">
                <StyledLabel>APY</StyledLabel>
                <StyledContent>{
                     newReward && pbrPrice && stakedValue && stakedValue.usdValue &&!stakedValue.usdValue.isZero()  ?
                  
                     `${pbrPrice
                       .times(new BigNumber(NUMBER_BLOCKS_PER_YEAR))
                       .times(newReward)
                       .div(stakedValue.usdValue)
                       .times(100)
                       .toFixed(1).toLocaleString()}%` : '+∞'
                }</StyledContent>
            </StyledBox>
            <StyledBox className="col-7">
                <StyledLabel>Total Value Locked</StyledLabel>
                <StyledContent>
                    {stakedValue && stakedValue.usdValue ? parseFloat(Web3.utils.fromWei(stakedValue.usdValue.toFixed(0).toString(),'ether')).toFixed(0).toLocaleString(): '~'} <span style={{fontSize: 10}}>USD</span></StyledContent>
                <StyledEquility>{totalStake  ? getBalanceNumber(totalStake).toFixed(2) : '~'} <span style={{fontSize: 10}}>{symbolShort} LP</span></StyledEquility>
            </StyledBox>
            <StyledBox className="col-3">
                <StyledLabel>Avg. reward per block</StyledLabel>
                <StyledContent>{newReward ? getBalanceNumber(newReward).toFixed(3) : '~'} PBR</StyledContent>
                <StyledEquility>≈ {stakedValue && newReward && pbrPrice && pbrPrice.times(newReward).div(10 ** 18).toFixed(3)} USD</StyledEquility>
            </StyledBox>
        </StyledApy>
    )
}
const StyledApy = styled.div`
    display: flex;
    justify-content: space-evenly;
    padding-top:30px;
  
    border-radius: 12px;
    @media (max-width: 767px) {
        width: 100%;
        margin: 0 auto;
        text-align: center;
    }
`
const StyledBox = styled.div`

`
const StyledLabel = styled.span`
    color: ${(props) => props.theme.color.primary.main};
    font-size: 14px;
    display: block;
`

const StyledContent = styled.span`
    color: ${(props) => props.theme.color.white};
    font-weight: bold;
    display: block;
    padding: 10px 0;
    @media (max-width: 767px) {
        font-size: 14px;
    }
`

const StyledEquility = styled.span`
    color: ${(props) => props.theme.color.grey[100]};
    font-size: 14px;
    display: block;
    @media (max-width: 767px) {
        font-size: 13px;
    }
`

export default Apy
