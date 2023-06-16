// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;
import "./RandomNumber.sol";
import "./TokenATM.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ClaimToken is Ownable {
    address public tokenATM;
    mapping(address => uint256) public checkUserClaim;
    address[] public userClaimed;
    address public winner;
    RandomNumber public randomNumContract;

    event UserWinner(address winner, uint256 valueRandom);

    constructor() {
        randomNumContract = RandomNumber(
            0x263FA503b3ee593a559026472Ba1B9294deda651
        );
    }

    function requestRanNum() public {
        // Request random words first
        randomNumContract.requestRandomWords();
    }

    function RandomValues()
        public
        view
        returns (bool fulfilled, uint256[] memory randomWords)
    {
        uint256 requestID = randomNumContract.lastRequestId();
        (fulfilled, randomWords) = randomNumContract.getRequestStatus(
            requestID
        );
    }

    function randomNumGenerator() public view returns (uint256) {
        uint256 requestID = randomNumContract.lastRequestId();
        (, uint256[] memory randomWords) = randomNumContract.getRequestStatus(
            requestID
        );
        // return first random word
        return randomWords[0];
    }

    function claimToken() public {
        require(checkUserClaim[msg.sender] == 0, "You have Claimed");
        checkUserClaim[msg.sender]++;
        userClaimed.push(msg.sender);
        TokenATM(tokenATM).transfer(msg.sender, 100 * 10 ** 18);
    }

    function pickWinner() public onlyOwner {
        require(userClaimed.length >= 30, "Amount User Claim is enough");
        uint256 index = randomNumGenerator() % userClaimed.length;
        winner = userClaimed[index];

        TokenATM(tokenATM).transfer(winner, 10000 * 10 ** 18);
        emit UserWinner(winner, index);
    }

    function seeUserClaimed() public view returns (address[] memory) {
        return userClaimed;
    }

    function getCountAddressUserClaim() public view returns (uint256) {
        return userClaimed.length;
    }

    function setToken(address _tokenATM) public onlyOwner {
        tokenATM = _tokenATM;
    }
}
