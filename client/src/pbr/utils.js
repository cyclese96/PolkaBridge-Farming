import BigNumber from 'bignumber.js'
// import { ethers } from 'ethers'
import axios from 'axios'
import config from '../config'
import { supportedPools, START_NEW_POOL_AT } from './lib/constants'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const MaxUint256 = '999999999900000000000000000000000000000'

const GAS_LIMIT = {
  STAKING: {
    DEFAULT: 200000,
    SNX: 850000,
  },
}

export const getMasterChefAddress = (pbr) => {
  return pbr && pbr.masterChefAddress
}
export const getPolkaBridgeAddress = (pbr) => {
  return pbr && pbr.pbrAddress
}

export const getXPBRAddress = (pbr) => {
  return pbr && pbr.xPolkaBridgeAddress
}

export const getMasterChefContract = (pbr) => {
  return pbr && pbr.contracts && pbr.contracts.masterChef
}
export const getPolkaBridgeContract = (pbr) => {
  return pbr && pbr.contracts && pbr.contracts.pbr
}
export const getXPolkaBridgeStakingContract = (pbr) => {
  return pbr && pbr.contracts && pbr.contracts.xPolkaBridgeStaking
}
export const getMakerContract = (pbr) => {
  return pbr && pbr.contracts && pbr.contracts.maker
}
export const getMakerAddress = (pbr) => {
  return pbr && pbr.makerAddress
}

export const getFarms = (pbr) => {
  return pbr
    ? pbr.contracts.pools.map(
      ({
        pid,
        name,
        symbol,
        icon,
        icon2,
        description,
        tokenAddress,
        tokenSymbol,
        token2Symbol,
        token2Address,
        symbolShort,
        tokenContract,
        token2Contract,
        isHot,
        isNew,
        isSoon,
        lpAddress,
        lpContract,
        protocal,
        iconProtocal,
        pairLink,
        addLiquidityLink,
        removeLiquidityLink,
      }) => ({
        pid,
        id: symbol,
        name,
        lpToken: symbol,
        lpTokenAddress: lpAddress,
        lpContract,
        tokenAddress,
        token2Address,
        tokenSymbol,
        token2Symbol,
        token2Contract,
        symbol,
        symbolShort,
        isHot,
        isNew,
        isSoon,
        tokenContract,
        earnToken: 'pbr',
        earnTokenAddress: pbr.contracts.pbr.options.address,
        icon,
        icon2,
        description,
        protocal,
        iconProtocal,
        pairLink,
        addLiquidityLink,
        removeLiquidityLink
      }),
    )
    : []
}

export const getPoolWeight = async (masterChefContract, pid) => {
  const { allocPoint } = await masterChefContract.methods.poolInfo(pid).call()
  const totalAllocPoint = await masterChefContract.methods
    .totalAllocPoint()
    .call()
  return new BigNumber(allocPoint).div(new BigNumber(totalAllocPoint))
}

export const getEarned = async (masterChefContract, pid, account) => {
  return masterChefContract.methods.pendingReward(pid, account).call()
}

export const getTotalLocked = async (masterChefContract) => {
  return masterChefContract.methods.totalLock().call()
}

export const getTotalUserLocked = async (masterChefContract, account) => {
  return masterChefContract.methods.lockOf(account).call()
}

export const getTotalLockedValue = async (tokenContract, lpContract, pbrPrice) => {
  const tokenAmountWholeLP = await tokenContract.methods
    .balanceOf(lpContract.options.address)
    .call()
  const tokenDecimals = await tokenContract.methods.decimals().call()
  const tokenAmountTotal = new BigNumber(tokenAmountWholeLP)
    .div(new BigNumber(10).pow(tokenDecimals))
  var usdValue = tokenAmountTotal.times(pbrPrice).times(2);
  return usdValue;
}

export const getLPValue = async (
  masterChefContract,
  lpContract,
  tokenContract,
  token2Contract,
  pid,
  pbrPrice,
) => {
  var usdtAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7'
  var usdcAddress = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'
  var wethAddress = '0xc778417e063141139fce010982780140aa0cd5ab'
  // Get balance of the token address
  const tokenAmountWholeLP = await tokenContract.methods
    .balanceOf(lpContract.options.address)
    .call()
  const tokenDecimals = await tokenContract.methods.decimals().call()
  // Get the share of lpContract that masterChefContract owns
  const balance = await lpContract.methods
    .balanceOf(masterChefContract.options.address)
    .call()
  // Convert that into the portion of total lpContract = p1
  const totalSupply = await lpContract.methods.totalSupply().call()
  // Get total token2 value for the lpContract = w1
  const lpContractToken2 = await token2Contract.methods
    .balanceOf(lpContract.options.address)
    .call()

  const token2Decimals = await token2Contract.methods.decimals().call()
  // Return p1 * w1 * 2
  const portionLp = new BigNumber(balance).div(new BigNumber(totalSupply))
  const totalLpToken2Value = portionLp.times(lpContractToken2).times(new BigNumber(2))
  // Calculate
  const tokenAmount = new BigNumber(tokenAmountWholeLP)
    .times(portionLp)
    .div(new BigNumber(10).pow(tokenDecimals))

  const token2Amount = new BigNumber(lpContractToken2)
    .times(portionLp)
    .div(new BigNumber(10).pow(token2Decimals))
  const tokenAmountTotal = new BigNumber(tokenAmountWholeLP)
    .div(new BigNumber(10).pow(tokenDecimals))

  const token2AmountTotal = new BigNumber(lpContractToken2)
    .div(new BigNumber(10).pow(token2Decimals))
  // console.log('pbrPrice: ', pbrPrice.toString())
  var tokenPriceInToken2 = pbrPrice
  // var tokenPriceInToken2 = tokenAmountTotal.div(token2AmountTotal)
  var totalToken2Value = totalLpToken2Value.div(new BigNumber(10).pow(token2Decimals))
  var usdValue = tokenAmountTotal.times(pbrPrice).times(2);
  if (token2Contract._address.toLowerCase() == usdtAddress
    || token2Contract._address.toLowerCase() == usdcAddress) {
    // usdValue = totalToken2Value
  }
  else if (token2Contract._address.toLowerCase() == wethAddress) {
    // var { data } = await axios.get(`${config.api}/price/ETH`)
    // usdValue = totalToken2Value.times(data.usdPrice)
  }

  return {
    pid,
    tokenAmount,
    token2Amount,
    totalToken2Value,
    tokenPriceInToken2,
    usdValue,
    // poolWeight: await getPoolWeight(masterChefContract, pid),
    tokenAmountTotal,
    token2AmountTotal
  }
}

export const getLPValuePrice = async (
  masterChefContract,
  lpContract,
  tokenContract,
  token2Contract,
  pid,
) => {

  const tokenAmountWholeLP = await tokenContract.methods
    .balanceOf(lpContract.options.address)
    .call()
  const tokenDecimals = await tokenContract.methods.decimals().call()
  const lpContractToken2 = await token2Contract.methods
    .balanceOf(lpContract.options.address)
    .call()
  const token2Decimals = await token2Contract.methods.decimals().call()

  const tokenAmountTotal = new BigNumber(tokenAmountWholeLP)
    .div(new BigNumber(10).pow(tokenDecimals))

  const token2AmountTotal = new BigNumber(lpContractToken2)
    .div(new BigNumber(10).pow(token2Decimals))

  return {
    price: token2AmountTotal.div(tokenAmountTotal)
  }
}


export const getLPTokenStaked = async (
  pbr,
  lpContract,
) => {
  var chef = getMasterChefContract(pbr)

  try {
    const balance = await lpContract.methods
      .balanceOf(chef.options.address)
      .call()
    return new BigNumber(balance)
  } catch (e) {
    return
  }
}

export const approve = async (lpContract, masterChefContract, account) => {
  return lpContract.methods
    .approve(masterChefContract.options.address, MaxUint256)
    .send({ from: account })
}

export const approveAddress = async (lpContract, address, account) => {
  return lpContract.methods
    .approve(address, MaxUint256)
    .send({ from: account })
}

export const checkPoolActive = async (pid) => {
  var p = supportedPools.find(e => e.pid === pid)
  if (p) {
    return p.isActived;
    // if (p.startAt >= new Date().getTime() / 1000) {
    //   return false
    // }
    // else if (!p.startAt) {
    //   return true
    // }
    // else {
    //   if (localStorage.getItem('POOLACTIVE' + pid + '-' + p.startBlock)) {
    //     return true
    //   }
    //   else {
    //     var { data } = await axios.get(`${config.api}/poolActive/${pid}`)
    //     if (data.isActived) {
    //       localStorage.setItem('POOLACTIVE' + pid + '-' + p.startBlock, true)
    //     }
    //     return data.isActived
    //   }
    // }
  }
  else {
    return false
  }

}

export const getNewRewardPerBlock = async (pbr, pid1 = 0) => {
  var chef = getMasterChefContract(pbr)
  try {
    const reward = await chef.methods
      .avgRewardPerBlock(pid1)
      .call()
    return new BigNumber(reward)
  } catch (e) {
    return
  }
}

export const stake = async (masterChefContract, pid, amount, account) => {
  return masterChefContract.methods
    .deposit(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const unstake = async (masterChefContract, pid, amount, account) => {
  return masterChefContract.methods
    .withdraw(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}
export const harvest = async (masterChefContract, pid, account) => {
  return masterChefContract.methods
    .claimReward(pid)
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const getStaked = async (masterChefContract, pid, account) => {
  try {
    const { amountLP } = await masterChefContract.methods
      .userInfo(pid, account)
      .call()
    return new BigNumber(amountLP)
  } catch {
    return new BigNumber(0)
  }
}

export const redeem = async (masterChefContract, account) => {
  let now = new Date().getTime() / 1000
  if (now >= 1597172400) {
    return masterChefContract.methods
      .exit()
      .send({ from: account })
      .on('transactionHash', (tx) => {
        console.log(tx)
        return tx.transactionHash
      })
  } else {
    alert('pool not active')
  }
}

export const getCanUnlockPBR = async (pbr, account) => {
  var pbr = getPolkaBridgeContract(pbr)

  return new BigNumber(await pbr.methods.canUnlockAmount(account).call())
}

export const getXPolkaBridgeSupply = async (pbr) => {
  return new BigNumber(await pbr.contracts.xPolkaBridgeStaking.methods.totalSupply().call())
}

export const getLockOf = async (pbr, account) => {
  var pbr = getPolkaBridgeContract(pbr)

  return new BigNumber(await pbr.methods.lockOf(account).call())
}

export const unlock = async (pbr, account) => {
  var pbr = getPolkaBridgeContract(pbr)
  return pbr.methods
    .unlock()
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}
export const enter = async (contract, amount, account) => {
  return contract.methods
    .enter(
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const makerConvert = async (contract, token0, token1, account) => {
  return contract.methods
    .convert(
      token0,
      token1,
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const leave = async (contract, amount, account) => {
  return contract.methods
    .leave(
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}
