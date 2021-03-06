const PolkaBridgeMasterFarm = artifacts.require("PolkaBridgeMasterFarm");
const PolkaBridge = artifacts.require("PolkaBridge");

const chai = require('./setupChai');

const BN = web3.utils.BN;

const expect = chai.expect;
require("dotenv").config({ path: "../.env" });

function tokens(n) {
    return web3.utils.toWei(n, 'ether');
}
function delay(interval) {
    return it('should delay', done => {
        setTimeout(() => done(), interval)

    }).timeout(interval + 100) // The extra 100ms should guarantee the test will not fail due to exceeded timeout
}
contract("Farming", async ([owner, acc1, acc2, acc3, acc4, acc5, acc6, acc7]) => {

    let farming, polkaBridge, lpToken;

    before(async () => {
        lpToken = await PolkaBridge.new(tokens(process.env.INITIAL_TOKENS));
        polkaBridge = await PolkaBridge.new(tokens(process.env.INITIAL_TOKENS));
        farming = await PolkaBridgeMasterFarm.new(polkaBridge.address, 1);

        // polkaBridge.setBeginDeflationFarming(1514870015);
        polkaBridge.transfer(farming.address, tokens("1000"));

        await lpToken.transfer(acc1, tokens("500"));
        await lpToken.transfer(acc2, tokens("425"));
        await lpToken.transfer(acc3, tokens("350"));
        await lpToken.transfer(acc4, tokens("210"));
        await lpToken.transfer(acc5, tokens("160"));

    })

    it('test farm 1 pool', async () => {
        async function getPoolInfo() {
            //pool info
            var poolInfo = await farming.getPoolInfo(0);
            console.log("============poolInfo=============")
            console.log("lastRewardBlock: " + poolInfo[0].toString() + "\n" +
                "lpToken: " + poolInfo[1].toString() + "\n" +
                "lastPoolReward: " + web3.utils.fromWei(new BN(poolInfo[2].toString())) + "\n" +
                "startDate: " + poolInfo[3].toString() + "\n" +
                "accPBRPerShare: " + web3.utils.fromWei(new BN(poolInfo[4].toString())) + "\n" +
                "isActived: " + poolInfo[5].toString() + "\n" +
                "lpBalance: " + web3.utils.fromWei(new BN(poolInfo[6].toString())) + "\n");
            console.log("====================================")
        }

        async function getPoolPBRBalance() {
            var poolBalance = await farming.poolBalance();
            console.log("poolPBRBalance: " + web3.utils.fromWei(new BN(poolBalance)));

        }
        async function getUserInfo(user) {
            //pool info
            var userInfo = await farming.getUserInfo(0, { from: user });
            console.log("============userInfo=============")
            console.log("amountLP: " + web3.utils.fromWei(new BN(userInfo[0].toString())) + "\n" +
                "rewardDebt: " + web3.utils.fromWei(new BN(userInfo[1].toString())) + "\n" +
                "rewardClaimed: " + web3.utils.fromWei(new BN(userInfo[2].toString())) + "\n");
            console.log("====================================")
        }

        //add pool
        await farming.add(lpToken.address, 1614857133, { from: owner });
        await getPoolInfo();

        //pool balance
        await getPoolPBRBalance();


        //=================================================================
        //acc1 deposit
        console.log("----USER 1 DEPOSIT---")
        await lpToken.approve(farming.address, tokens("999999999999999999"), { from: acc1 });
        await farming.deposit(0, tokens("500"), { from: acc1 });
        await getPoolInfo();

        //depost PBR reward
        console.log("----MORE 500 REWARD---")
        polkaBridge.transfer(farming.address, tokens("500"));
        await getPoolPBRBalance();

        // //pending reward
        var pendingAcc1 = await farming.pendingReward(0, acc1, { from: acc1 });
        console.log("pendingAcc1: " + web3.utils.fromWei(new BN(pendingAcc1)));

        //=================================================================
        //acc2 deposit
        console.log("----USER 2 DEPOSIT---")
        await lpToken.approve(farming.address, tokens("999999999999999999"), { from: acc2 });
        await farming.deposit(0, tokens("410"), { from: acc2 });
        await getPoolInfo();

        //depost PBR reward
        console.log("----MORE 450 REWARD---")
        polkaBridge.transfer(farming.address, tokens("450"));
        await getPoolPBRBalance();
        // //pending reward

        pendingAcc1 = await farming.pendingReward(0, acc1, { from: acc1 });
        console.log("pendingAcc1: " + web3.utils.fromWei(new BN(pendingAcc1)));

        var pendingAcc2 = await farming.pendingReward(0, acc2, { from: acc2 });
        console.log("pendingAcc2: " + web3.utils.fromWei(new BN(pendingAcc2)));


        //======================================================================
        //acc3 deposit
        console.log("----USER 3 DEPOSIT---")
        await lpToken.approve(farming.address, tokens("999999999999999999"), { from: acc3 });
        await farming.deposit(0, tokens("310"), { from: acc3 });
        await getPoolInfo();

        //depost PBR reward
        console.log("----MORE 231 REWARD---")
        polkaBridge.transfer(farming.address, tokens("231"));
        await getPoolPBRBalance();
        // //pending reward

        pendingAcc1 = await farming.pendingReward(0, acc1, { from: acc1 });
        console.log("pendingAcc1: " + web3.utils.fromWei(new BN(pendingAcc1)));

        pendingAcc2 = await farming.pendingReward(0, acc2, { from: acc2 });
        console.log("pendingAcc2: " + web3.utils.fromWei(new BN(pendingAcc2)));

        var pendingAcc3 = await farming.pendingReward(0, acc3, { from: acc3 });
        console.log("pendingAcc3: " + web3.utils.fromWei(new BN(pendingAcc3)));

        //user 1 withdraw
        console.log("----USER 1 WITHDRAW---")
        await farming.withdraw(0, tokens("217"), { from: acc1 });
        await getPoolInfo();

        await getPoolPBRBalance();
        pendingAcc1 = await farming.pendingReward(0, acc1, { from: acc1 });
        console.log("pendingAcc1: " + web3.utils.fromWei(new BN(pendingAcc1)));

        pendingAcc2 = await farming.pendingReward(0, acc2, { from: acc2 });
        console.log("pendingAcc2: " + web3.utils.fromWei(new BN(pendingAcc2)));

        var pendingAcc3 = await farming.pendingReward(0, acc3, { from: acc3 });
        console.log("pendingAcc3: " + web3.utils.fromWei(new BN(pendingAcc3)));

        var acc1Balance = await polkaBridge.balanceOf(acc1);
        console.log("acc1Balance: " + web3.utils.fromWei(new BN(acc1Balance)));

        //deposit PBR reward
        console.log("----MORE 2006 REWARD---")
        polkaBridge.transfer(farming.address, tokens("2006"));
        await getPoolPBRBalance();
        pendingAcc1 = await farming.pendingReward(0, acc1, { from: acc1 });
        console.log("pendingAcc1: " + web3.utils.fromWei(new BN(pendingAcc1)));

        pendingAcc2 = await farming.pendingReward(0, acc2, { from: acc2 });
        console.log("pendingAcc2: " + web3.utils.fromWei(new BN(pendingAcc2)));

        var pendingAcc3 = await farming.pendingReward(0, acc3, { from: acc3 });
        console.log("pendingAcc3: " + web3.utils.fromWei(new BN(pendingAcc3)));

        // user 2 claim reward
        console.log("----USER 2 CLAIM---")
        await farming.claimReward(0, { from: acc2 });
        await getPoolInfo();

        // //pending reward
        await getPoolPBRBalance();

        pendingAcc1 = await farming.pendingReward(0, acc1, { from: acc1 });
        console.log("pendingAcc1: " + web3.utils.fromWei(new BN(pendingAcc1)));

        pendingAcc2 = await farming.pendingReward(0, acc2, { from: acc2 });
        console.log("pendingAcc2: " + web3.utils.fromWei(new BN(pendingAcc2)));

        var pendingAcc3 = await farming.pendingReward(0, acc3, { from: acc3 });
        console.log("pendingAcc3: " + web3.utils.fromWei(new BN(pendingAcc3)));
        
        var acc2Balance = await polkaBridge.balanceOf(acc2);
        console.log("acc2Balance: " + web3.utils.fromWei(new BN(acc2Balance)));

        console.log("----MORE 1003 REWARD---")
        polkaBridge.transfer(farming.address, tokens("1003"));
        await getPoolPBRBalance();
        pendingAcc1 = await farming.pendingReward(0, acc1, { from: acc1 });
        console.log("pendingAcc1: " + web3.utils.fromWei(new BN(pendingAcc1)));

        pendingAcc2 = await farming.pendingReward(0, acc2, { from: acc2 });
        console.log("pendingAcc2: " + web3.utils.fromWei(new BN(pendingAcc2)));

        var pendingAcc3 = await farming.pendingReward(0, acc3, { from: acc3 });
        console.log("pendingAcc3: " + web3.utils.fromWei(new BN(pendingAcc3)));

        //acc1 deposit
        console.log("----USER 1 DEPOSIT---")
        await farming.deposit(0, tokens("100"), { from: acc1 });
        await getPoolInfo();
        await getPoolPBRBalance();
        pendingAcc1 = await farming.pendingReward(0, acc1, { from: acc1 });
        console.log("pendingAcc1: " + web3.utils.fromWei(new BN(pendingAcc1)));

        pendingAcc2 = await farming.pendingReward(0, acc2, { from: acc2 });
        console.log("pendingAcc2: " + web3.utils.fromWei(new BN(pendingAcc2)));

        var pendingAcc3 = await farming.pendingReward(0, acc3, { from: acc3 });
        console.log("pendingAcc3: " + web3.utils.fromWei(new BN(pendingAcc3)));
    });



});