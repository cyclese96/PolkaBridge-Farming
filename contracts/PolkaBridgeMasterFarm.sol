pragma solidity >=0.6.0;

import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";
import "./PolkaBridge.sol";

// import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";
//import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
//import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";

contract PolkaBridgeMasterFarm is Ownable {
    string public name = "PolkaBridge: Deflationary Farming";
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    struct UserInfo {
        uint256 amountLP;
        uint256 rewardDebt;
        uint256 rewardDebtAtBlock;
        uint256 rewardClaimed;
    }

    struct PoolInfo {
        IERC20 lpToken;
        uint256 lastPoolReward; //history pool reward
        uint256 lastRewardBlock;
        uint256 accPBRPerShare;
        uint256 startDate;
        uint256 stopDate;
        uint256 totalRewardClaimed;
        bool isActived;
    }

    PolkaBridge public polkaBridge;
    uint256 public START_BLOCK;

    //pool Info
    PoolInfo[] public poolInfo;
    mapping(address => uint256) public poolId1;
    // Info of each user that stakes LP tokens. pid => user address => info
    mapping(uint256 => mapping(address => UserInfo)) public userInfo;

    constructor(PolkaBridge _polkaBridge, uint256 _startBlock) public {
        polkaBridge = _polkaBridge;
        START_BLOCK = _startBlock;
    }

    function poolBalance() public view returns (uint256) {
        return polkaBridge.balanceOf(address(this));
    }

    // Add a new lp to the pool. Can only be called by the owner.
    function add(IERC20 _lpToken, uint256 _startDate) public onlyOwner {
        require(
            poolId1[address(_lpToken)] == 0,
            "PolkaBridgeMasterFarm::add: lp is already in pool"
        );

        uint256 _lastRewardBlock =
            block.number > START_BLOCK ? block.number : START_BLOCK;

        poolId1[address(_lpToken)] = poolInfo.length + 1;
        poolInfo.push(
            PoolInfo({
                lpToken: _lpToken,
                lastRewardBlock: _lastRewardBlock,
                lastPoolReward: 0,
                accPBRPerShare: 0,
                startDate: _startDate,
                stopDate: 0,
                totalRewardClaimed: 0,
                isActived: true
            })
        );

        massUpdatePools();
    }

    function getChangePoolReward() public view returns (uint256) {
        uint256 numberActivedPool = countActivePool();
        uint256 changePoolReward =
            (poolBalance() - getTotalLastPoolReward()) / numberActivedPool;
        if (changePoolReward <= 0) changePoolReward = 0;
        return changePoolReward;
    }

    function massUpdatePools() public {
        uint256 length = poolInfo.length;
        uint256 changePoolReward = getChangePoolReward();
        for (uint256 pid = 0; pid < length; pid++) {
            if (poolInfo[pid].isActived) {
                updatePool(pid, changePoolReward);
            }
        }
    }

    function getTotalLastPoolReward() public view returns (uint256) {
        uint256 total;
        uint256 length = poolInfo.length;
        for (uint256 pid = 0; pid < length; pid++) {
            if (poolInfo[pid].isActived) {
                total += poolInfo[pid].lastPoolReward;
            }
        }
        return total;
    }

    // Update reward variables of the given pool to be up-to-date.
    function updatePool(uint256 _pid, uint256 _changePoolReward) public {
        PoolInfo storage pool = poolInfo[_pid];
        if (block.number <= pool.lastRewardBlock) {
            return;
        }
        uint256 lpSupply = pool.lpToken.balanceOf(address(this)); //total lp
        if (lpSupply == 0) {
            pool.lastRewardBlock = block.number;
            return;
        }

        pool.accPBRPerShare = pool.accPBRPerShare.add(
            _changePoolReward.div(lpSupply)
        );
        pool.lastRewardBlock = block.number;

        pool.lastPoolReward += _changePoolReward;
    }

    function pendingReward(uint256 _pid, address _user)
        external
        view
        returns (uint256)
    {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][_user];
        uint256 accPBRPerShare = pool.accPBRPerShare;
        uint256 lpSupply = pool.lpToken.balanceOf(address(this));
        uint256 temptAccPBRPerShare;

        if (block.number > pool.lastRewardBlock && lpSupply > 0) {
            temptAccPBRPerShare = pool.accPBRPerShare.add(
                getChangePoolReward().div(lpSupply)
            );
        }

        return user.amountLP.mul(temptAccPBRPerShare).sub(user.rewardDebt);
    }

    // function claimReward(uint256 _pid) public {
    //     massUpdatePools();
    //     _harvest(_pid);
    // }

    function _harvest(uint256 _pid) internal {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];

        if (user.amountLP > 0) {
            uint256 pending =
                user.amountLP.mul(pool.accPBRPerShare).sub(user.rewardDebt);
            uint256 masterBal = poolBalance();

            if (pending > masterBal) {
                pending = masterBal;
            }

            if (pending > 0) {
                polkaBridge.transfer(msg.sender, pending);

                user.rewardDebtAtBlock = block.number;
            }

            user.rewardDebt = user.amountLP.mul(pool.accPBRPerShare);
            user.rewardClaimed += pending;
        }
    }

    function deposit(uint256 _pid, uint256 _amount) public {
        require(
            _amount > 0,
            "PolkaBridgeMasterFarmer::deposit: amount must be greater than 0"
        );

        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];

        massUpdatePools();
        _harvest(_pid);
        pool.lpToken.safeTransferFrom(
            address(msg.sender),
            address(this),
            _amount
        );

        if (user.amountLP == 0) {
            user.rewardDebtAtBlock = block.number;
        }

        user.amountLP = user.amountLP.add(_amount);
        user.rewardDebt = user.amountLP.mul(pool.accPBRPerShare);
    }

    function withdraw(uint256 _pid, uint256 _amount) public {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];
        require(
            user.amountLP >= _amount,
            "PolkaBridgeMasterFarmer::withdraw: not good"
        );

        massUpdatePools();
        _harvest(_pid);

        if (_amount > 0) {
            user.amountLP = user.amountLP.sub(_amount);
            pool.lpToken.safeTransfer(address(msg.sender), _amount);
        }
        user.rewardDebt = user.amountLP.mul(pool.accPBRPerShare);
    }

    function emergencyWithdraw(uint256 _pid) public {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];
        pool.lpToken.safeTransfer(address(msg.sender), user.amountLP);

        user.amountLP = 0;
        user.rewardDebt = 0;
    }

    function getPoolInfo(uint256 _pid)
        public
        view
        returns (
            uint256,
            address,
            uint256,
            uint256,
            uint256,
            bool,
            uint256
        )
    {
        return (
            poolInfo[_pid].lastRewardBlock,
            address(poolInfo[_pid].lpToken),
            poolInfo[_pid].lastPoolReward,
            poolInfo[_pid].startDate,
            poolInfo[_pid].accPBRPerShare,
            poolInfo[_pid].isActived,
            poolInfo[_pid].lpToken.balanceOf(address(this))
        );
    }

    function stopPool(uint256 pid) public onlyOwner {
        PoolInfo storage pool = poolInfo[pid];
        pool.isActived = false;
        pool.stopDate = block.timestamp;
    }

    function countActivePool() public view returns (uint256) {
        uint256 length = 0;
        for (uint256 i = 0; i < poolInfo.length; i++) {
            if (poolInfo[i].isActived) length++;
        }
        return length;
    }

    receive() external payable {}
}
