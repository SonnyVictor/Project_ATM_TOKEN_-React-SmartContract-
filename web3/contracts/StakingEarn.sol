// SPDX-License-Identifier: MIT
pragma solidity ^0.8;
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract StakingEarn is Ownable, ReentrancyGuard {
    using SafeMath for uint256;
    uint256 public oneMonth = 30 days;
    uint256 public threeMonth = oneMonth * 3;
    uint256 public sixMonth = threeMonth * 2;
    struct Stake {
        uint256 amount;
        uint256 startTimestamp;
        uint256 endTimestamp;
        uint256 duration;
        uint256 interest;
        uint256 totalAmount;
        bool claim;
    }
    mapping(uint256 => uint256) public rewards;

    mapping(address => Stake[]) public infoStake;

    event UserStake(
        address indexed user,
        uint256 amount,
        uint256 startTimestamp,
        uint256 endTimestamp,
        uint256 duration,
        uint256 interest,
        uint256 totalAmount,
        bool claim
    );
    event Claim(
        address indexed user,
        uint256 indexed stakeIndex,
        uint256 amount
    );

    function stake(uint256 _time) external payable {
        uint256 _amount = msg.value;
        require(_amount > 0, "Amount > 0");
        Stake[] storage stk = infoStake[msg.sender];
        uint256 value;
        if (_time == threeMonth) {
            value = rewards[1];
        } else if (_time == sixMonth) {
            value = rewards[2];
        }
        stk.push(
            Stake(
                _amount,
                block.timestamp,
                block.timestamp + _time,
                _time,
                value,
                caluteRateReward(_amount, value),
                false
            )
        );
        emit UserStake(
            msg.sender,
            _amount,
            block.timestamp,
            block.timestamp + _time,
            _time,
            value,
            caluteRateReward(_amount, value),
            false
        );
    }

    function claim() external payable nonReentrant {
        Stake[] storage stk = infoStake[msg.sender];
        for (uint256 i = 0; i < stk.length; i++) {
            if (block.timestamp >= stk[i].endTimestamp && !stk[i].claim) {
                uint256 totalAmountWithInterest = stk[i].totalAmount;
                payable(msg.sender).transfer(totalAmountWithInterest);
                stk[i].claim = true;
                emit Claim(msg.sender, i, totalAmountWithInterest);
            }
        }
    }

    function getUserStake() public view returns (Stake[] memory) {
        return infoStake[msg.sender];
    }

    function caluteRateReward(
        uint256 _amount,
        uint256 rate
    ) private pure returns (uint256) {
        return _amount + _amount.mul(rate).div(100);
    }

    function setReward(uint256 id, uint256 valueRate) external onlyOwner {
        rewards[id] = valueRate;
    }

    function getReward(uint256 key) public view returns (uint256) {
        return rewards[key];
    }

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "Contract balance is zero");
        (bool sent, ) = msg.sender.call{value: balance}("");
        require(sent, "Failed to send Ether");
    }

    receive() external payable {}

    fallback() external payable {}
}
