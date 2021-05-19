pragma solidity ^0.6.0;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/math/SafeMathUpgradeable.sol";

contract EglGenesis is Initializable, OwnableUpgradeable, PausableUpgradeable {
    using SafeMathUpgradeable for uint;

    uint constant MIN_CONTRIBUTION_AMOUNT = 0.001 ether;

    uint public cumulativeBalance;
    uint public contributorsCount;
    bool public canContribute;
    bool public canWithdraw;
    address[] public contributorsList;    
    mapping(address => Contributor) public contributors;

    uint private maxThreshold;

    struct Contributor {
        uint amount;
        uint cumulativeBalance;
        uint idx;
        uint date;
    }

    event Initialized(
        address owner, 
        bool canContribute,
        uint maxThreshold
    );

    event ContributionReceived(
        address contributor, 
        uint amount,
        uint cumulativeBalance,
        uint idx,        
        uint date
    );

    event ContributionWithdrawn(
        address contributor, 
        uint amount,
        uint date
    );

    event WithdAllowed(
        address owner, 
        uint date
    );

    event GenesisEnded(
        address owner,
        uint cumulativeBalance, 
        uint contractBalance,
        uint date
    );

    event ThresholdMet(
        uint contractBalance,
        uint date
    );

    /**
     * @dev Receive eth
     */
    receive() external payable whenNotPaused {
        require(canContribute, "GENESIS:GENESIS_ENDED");
        require(msg.value >= MIN_CONTRIBUTION_AMOUNT, "GENESIS:INVALID_AMOUNT");
        require(contributors[msg.sender].amount == 0, "GENESIS:ALREADY_CONTRIBUTED");

        contributorsList.push(msg.sender);
        cumulativeBalance = cumulativeBalance.add(msg.value);
        contributorsCount = contributorsCount.add(1);

        Contributor storage contributor = contributors[msg.sender];
        contributor.amount = msg.value;
        contributor.cumulativeBalance = cumulativeBalance;
        contributor.idx = contributorsCount;
        contributor.date = now;        

        if (cumulativeBalance >= maxThreshold) {
            canContribute = false;
            emit ThresholdMet(cumulativeBalance, now);
        }            
        emit ContributionReceived(
            msg.sender, 
            contributor.amount, 
            contributor.cumulativeBalance, 
            contributor.idx, 
            contributor.date
        );
    }

    /**
     * @dev Initialize contract variables
     * 
     * @param _owner Address of wallet that will have administrative priviledges over the contract
     * @param _threshold Max amount of ETH to collect before automatically stopping collection
     */
    function initialize(address _owner, uint _threshold) public initializer {
        __Context_init_unchained();
        __Ownable_init_unchained();
        __Pausable_init_unchained();

        transferOwnership(_owner);
        canContribute = true;
        maxThreshold = _threshold;
        emit Initialized(owner(), canContribute, _threshold);
    }

    /**
     * @dev Withdraw ETH contributed only if contributed and withdraw flag is set to 'true'
     */
    function withdraw() public whenNotPaused {
        require(canWithdraw, "GENESIS:WITHDRAW_NOT_ALLOWED");
        require(contributors[msg.sender].amount > 0, "GENESIS:NOT_CONTRIBUTED");

        uint amountToWithdraw = contributors[msg.sender].amount;
        uint contributorIdx = contributors[msg.sender].idx;
        delete contributors[msg.sender];
        delete contributorsList[contributorIdx - 1];
        
        cumulativeBalance = cumulativeBalance.sub(amountToWithdraw);
        (bool success, ) = msg.sender.call{ value: amountToWithdraw}("");
        require(success, "GENESIS:WITHDRAW_FAILED");        
        emit ContributionWithdrawn(msg.sender, amountToWithdraw, now);
    }

    /**
     * @dev Owner only function to set the withdraw flag to 'true'
     */
    function allowWithdraw() public onlyOwner whenNotPaused {
        require(cumulativeBalance < maxThreshold, "GENESIS:MAX_THRESHOLD_REACHED");
        require(canContribute, "GENESIS:GENESIS_ENDED");
        canWithdraw = true;
        canContribute = false;
        emit WithdAllowed(msg.sender, now);
    }

    /** 
     * @dev End genesis period and transfer contract balance to owner wallet
     */
    function endGenesis() public onlyOwner whenNotPaused {
        canContribute = false;
        (bool success, ) = msg.sender.call{ value: cumulativeBalance}("");
        require(success, "GENESIS: CLOSE_FAILED");
        emit GenesisEnded(msg.sender, cumulativeBalance, address(this).balance, now);
        cumulativeBalance = 0;
    }

    /**
     * @dev Ower only funciton to pause contract
     */
    function pauseGenesis() public onlyOwner whenNotPaused {
        _pause();
    }

    /** 
     * @dev Owner only function to unpause contract
     */
    function unpauseGenesis() public onlyOwner whenPaused {
        _unpause();
    }
}