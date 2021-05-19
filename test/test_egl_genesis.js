const EglGenesis = artifacts.require("./EglGenesis.sol");
const { expectRevert } = require("@openzeppelin/test-helpers");
const { BN } = require("bn.js");
const {
    populateAllEventDataFromLogs,    
} = require("./helpers/helper-functions")

const EventType = {
    INITIALIZED: "Initialized",
    THRESHOLD_MET: "ThresholdMet",
};

contract("EglGenesisTests", (accounts) => {
    const [_deployer, _contributor1, _contributor2, _contributor3, _contributor4, _owner] = accounts;
    
    let eglGenesisInstance;
    let initEvent;

    beforeEach(async () => {             
        eglGenesisInstance = await EglGenesis.new();
        let txReceipt = await eglGenesisInstance.initialize(
            _owner, 
            new BN(web3.utils.toWei("10"))
        );
        initEvent = populateAllEventDataFromLogs(txReceipt, EventType.INITIALIZED)[0];
    });

    describe("Initialization", function () {
        it("should initialize with correct values", async () => {
            assert.equal(
                await eglGenesisInstance.owner(),
                _owner,
                "Incorrect Owner"
            )
            assert.equal(
                await eglGenesisInstance.canContribute(),
                true,
                "Incorrect 'canContribute' flag value"
            )
            assert.equal(
                initEvent.maxThreshold.toString(),
                new BN(web3.utils.toWei("10")).toString(),
                "Incorrect max threshold"
            )
        });
    });
    describe("Receive ETH Contributions", function () {
        it("should receive ETH contribution", async () => {
            eglGenesisInstance.sendTransaction({
                from: _contributor1,                
                value: web3.utils.toWei("0.1")
            });
            let contribution = await eglGenesisInstance.contributors(_contributor1);
            assert.equal(
                contribution.amount.toString(),
                new BN(web3.utils.toWei("0.1")).toString(),
                "Incorrect contribution amount stored"
            )
            assert.equal(
                contribution.cumulativeBalance.toString(),
                new BN(web3.utils.toWei("0.1")).toString(),
                "Incorrect cumulative balance stored"
            )
            assert.equal(
                contribution.idx.toString(),
                "1",
                "Incorrect idx stored"
            )
        });
        it("should receive multiple ETH contributions", async () => {
            let contributors = {};
            contributors[_contributor1] = "0.1";
            contributors[_contributor2] = "0.3",
            contributors[_contributor3] = "0.275"

            let cumulativeBalance = 0;
            let idx = 0
            for (let contributor in contributors) {
                idx++;
                eglGenesisInstance.sendTransaction({
                    from: contributor,                
                    value: web3.utils.toWei(contributors[contributor])
                });
                cumulativeBalance += parseFloat(contributors[contributor]);

                let storedContribution = await eglGenesisInstance.contributors(contributor);
                assert.equal(
                    storedContribution.amount.toString(),
                    new BN(web3.utils.toWei(contributors[contributor])).toString(),
                    "Incorrect contribution amount stored"
                )
                assert.equal(
                    storedContribution.cumulativeBalance.toString(),
                    new BN(web3.utils.toWei(cumulativeBalance.toString())).toString(),
                    "Incorrect cumulative balance stored"
                )
                assert.equal(
                    storedContribution.idx.toString(),
                    idx,
                    "Incorrect idx stored"
                )            
            }
        });
        it("should not allow multiple ETH contributions from the same account", async () => {
            eglGenesisInstance.sendTransaction({
                from: _contributor1,                
                value: web3.utils.toWei("0.1")
            });

            await expectRevert(
                eglGenesisInstance.sendTransaction({
                    from: _contributor1,                
                    value: web3.utils.toWei("1")
                }),
                "GENESIS:ALREADY_CONTRIBUTED"
            );
        });
        it("should allow minimum ETH amount", async () => {
            eglGenesisInstance.sendTransaction({
                from: _contributor1,                
                value: web3.utils.toWei("0.001")
            });
            assert.equal(
                await eglGenesisInstance.cumulativeBalance(),
                new BN(web3.utils.toWei("0.001")).toString(),
                "Incorrect cumulative balance"
            );
        });
        it("should not allow ETH amount less than the minimum", async () => {
            await expectRevert(
                eglGenesisInstance.sendTransaction({
                    from: _contributor1,                
                    value: web3.utils.toWei("0.0009")
                }),
                "GENESIS:INVALID_AMOUNT"
            );
        });
        it("should not allow contributions if genesis has ended", async () => {
            await eglGenesisInstance.endGenesis({ from: _owner });

            await expectRevert(
                eglGenesisInstance.sendTransaction({
                    from: _contributor1,                
                    value: web3.utils.toWei("0.1")
                }),
                "GENESIS:GENESIS_ENDED"
            );
        });
        it("should not allow contributions if paused", async () => {
            await eglGenesisInstance.pauseGenesis({ from: _owner })
            await expectRevert(
                eglGenesisInstance.sendTransaction({
                    from: _contributor1,                
                    value: web3.utils.toWei("0.1")
                }),
                "Pausable: paused"
            );
        });
        it("should stop contributions once threshold is met", async () => {
            let txReceipt = await eglGenesisInstance.sendTransaction({
                from: _contributor1,                
                value: web3.utils.toWei("10")
            });

            assert.equal(
                await eglGenesisInstance.canContribute(), 
                false, 
                "threshold met, should not allow any more contributions"
            );
            thresholdMetEvent = populateAllEventDataFromLogs(txReceipt, EventType.THRESHOLD_MET)[0];
            assert.equal(
                thresholdMetEvent.contractBalance, 
                web3.utils.toWei("10"), 
                "incorrect contract balance"
            );
        });
    });
    describe("Withdraw ETH", function () {
        it("should not be able to withdraw ETH without flag being set", async () => {
            await eglGenesisInstance.sendTransaction({
                from: _contributor1,                
                value: web3.utils.toWei("0.5")
            });
            await expectRevert(
                eglGenesisInstance.withdraw({
                    from: _contributor1
                }),
                "GENESIS:WITHDRAW_NOT_ALLOWED"
            );
        });
        it("should not be able to withdraw ETH if not contributed", async () => {
            await eglGenesisInstance.allowWithdraw({ from: _owner });
            await expectRevert(
                eglGenesisInstance.withdraw({
                    from: _contributor2
                }),
                "GENESIS:NOT_CONTRIBUTED"
            );
        });
        it("should have account zeroed out after withdraw", async () => {
            await eglGenesisInstance.sendTransaction({
                from: _contributor1,                
                value: web3.utils.toWei("0.3")
            });
            await eglGenesisInstance.allowWithdraw({ from: _owner })
            await eglGenesisInstance.withdraw({ from: _contributor1 })
            
            let contributor1 = await eglGenesisInstance.contributors(_contributor1)
            assert.equal(
                contributor1.amount, 
                "0", 
                "amount after withdraw should be 0"
            );
            assert.equal(
                contributor1.cumulativeBalance, 
                "0", 
                "cumulative balance after withdraw should be 0"
            );
            assert.equal(
                contributor1.idx, 
                "0", 
                "idx after withdraw should be 0"
            );
        });
        it("should withdraw contribution amount", async () => {            
            await eglGenesisInstance.sendTransaction({
                from: _contributor1,                
                value: web3.utils.toWei("0.1")
            });
            let balanceAfterContribution = new BN(await web3.eth.getBalance(_contributor1));
            await eglGenesisInstance.allowWithdraw({ from: _owner })
            await eglGenesisInstance.withdraw({ from: _contributor1 })
            let balanceAfterWithdraw = new BN(await web3.eth.getBalance(_contributor1));
            let withdrawnAmountLessGas = balanceAfterWithdraw.sub(balanceAfterContribution);

            assert.approximately(
                parseFloat(web3.utils.fromWei(withdrawnAmountLessGas.toString())),
                0.1,
                0.01,
                "incorrect amount withdraw"
            );
        });
        it("should decrease cumulative balance with withdrawn amount after withdraw", async () => {
            let contributors = {};
            contributors[_contributor1] = "0.3";
            contributors[_contributor2] = "0.1",
            contributors[_contributor3] = "0.01"
            for (let contributor in contributors) {
                await eglGenesisInstance.sendTransaction({
                    from: contributor,                
                    value: web3.utils.toWei(contributors[contributor])
                });
            }
            assert.equal(
                await eglGenesisInstance.cumulativeBalance(),
                new BN(web3.utils.toWei("0.41")).toString(),
                "Incorrect cumulative balance after contributions"
            );

            await eglGenesisInstance.allowWithdraw({ from: _owner });
            await eglGenesisInstance.withdraw({ from: _contributor1 });
            assert.equal(
                await eglGenesisInstance.cumulativeBalance(),
                new BN(web3.utils.toWei("0.11")).toString(),
                "Incorrect cumulative balance after first withdrawal"
            )            
            await eglGenesisInstance.withdraw({ from: _contributor2 });
            assert.equal(
                await eglGenesisInstance.cumulativeBalance(),
                new BN(web3.utils.toWei("0.01")).toString(),
                "Incorrect cumulative balance after second withdrawal"
            )            
        });
        it("should not allow withdraw if paused", async () => {
            await eglGenesisInstance.sendTransaction({
                from: _contributor1,                
                value: web3.utils.toWei("0.1")
            });
            await eglGenesisInstance.allowWithdraw({ from: _owner })

            await eglGenesisInstance.pauseGenesis({ from: _owner })            
            await expectRevert(
                eglGenesisInstance.withdraw({ from: _contributor1 }),
                "Pausable: paused"
            );
        });
    });
    describe("End Genesis", function () {
        it("should allow owner to end genesis", async () => {
            assert.equal(
                await eglGenesisInstance.canContribute(), 
                true, 
                "incorrect initial 'canContribute' value"
            );

            await eglGenesisInstance.endGenesis({ from: _owner })

            assert.equal(
                await eglGenesisInstance.canContribute(), 
                false, 
                "incorrect 'canContribute' value after end called"
            );
        });
        it("should not allow non owner to end contract", async () => {
            await expectRevert(
                eglGenesisInstance.endGenesis({
                    from: _contributor1
                }),
                "Ownable: caller is not the owner"
            );
        });
        it("should send contract balance to owner address", async () => {
            let contributors = {};
            contributors[_contributor1] = "0.1";
            contributors[_contributor2] = "0.1";
            contributors[_contributor3] = "0.1";

            for (let contributor in contributors) {
                eglGenesisInstance.sendTransaction({
                    from: contributor,                
                    value: web3.utils.toWei(contributors[contributor])
                });
            }
            assert.equal(
                await eglGenesisInstance.cumulativeBalance(),
                new BN(web3.utils.toWei("0.3")).toString(),
                "Incorrect cumulative balance"
            );

            let balanceBeforeEnd = new BN(await web3.eth.getBalance(_owner));

            await eglGenesisInstance.endGenesis({ from: _owner });
            let balanceAfterEnd = new BN(await web3.eth.getBalance(_owner));
            let ownerAmountReceivedLessGas = balanceAfterEnd.sub(balanceBeforeEnd);

            assert.approximately(
                parseFloat(web3.utils.fromWei(ownerAmountReceivedLessGas.toString())),
                0.3,
                0.01,
                "Incorrect owner balance after end"
            );
            assert.equal(
                await eglGenesisInstance.cumulativeBalance(),
                "0",
                "Incorrect cumulative balance after end"
            );
        });
        it("should not be allowed to contribute after genesis ended", async () => {
            await eglGenesisInstance.endGenesis({ from: _owner })

            assert.equal(
                await eglGenesisInstance.canContribute(), 
                false, 
                "Should not be able to contribute once genesis ends"
            );
        });
    });
    describe("Pause and Unpause", function () {
        it("should allow owner to set paused flag", async () => {
            assert.equal(
                await eglGenesisInstance.paused(), 
                false, 
                "Contract should not be paused"
            );
            
            await eglGenesisInstance.pauseGenesis({ from: _owner });
            assert.equal(
                await eglGenesisInstance.paused(), 
                true, 
                "Contract should be paused"
            );
        });
        it("should allow owner to unpause contract", async () => {
            await eglGenesisInstance.pauseGenesis({ from: _owner });
            assert.equal(
                await eglGenesisInstance.paused(), 
                true, 
                "Contract should be paused"
            );

            await eglGenesisInstance.unpauseGenesis({ from: _owner });
            assert.equal(
                await eglGenesisInstance.paused(), 
                false, 
                "Contract should not be paused"
            );
        });
        it("should not allow non owner to pause contract", async () => {
            await expectRevert(
                eglGenesisInstance.pauseGenesis({
                    from: _contributor1
                }),
                "Ownable: caller is not the owner"
            );
        });
    });
    describe("Allow Withdraw", function () {
        it("should allow owner to set withdraw flag", async () => {
            assert.equal(
                await eglGenesisInstance.canWithdraw(), 
                false, 
                "Should not be able to withdraw"
            );
            assert.equal(
                await eglGenesisInstance.canContribute(), 
                true, 
                "Should be able to contribute"
            );
            
            await eglGenesisInstance.allowWithdraw({ from: _owner });
            assert.equal(
                await eglGenesisInstance.canWithdraw(), 
                true, 
                "Should be able to withdraw"
            );
            assert.equal(
                await eglGenesisInstance.canContribute(), 
                false, 
                "Should not be able to contribute"
            );
        });
        it("should not allow non owner to pause contract", async () => {
            await expectRevert(
                eglGenesisInstance.allowWithdraw({
                    from: _contributor1
                }),
                "Ownable: caller is not the owner"
            );
        });
        it("should not allow setting withdraw flag when genesis ended", async () => {
            await eglGenesisInstance.endGenesis({ from: _owner });

            await expectRevert(
                eglGenesisInstance.allowWithdraw({
                    from: _owner
                }),
                "GENESIS:GENESIS_ENDED"
            );
        });
    });
});