// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract CrowdSale is Ownable {
    using SafeERC20 for IERC20;
    address payable public _wallet;
    uint256 public ETH_rate;
    IERC20 public token;

    event BuyTokenByETH(address buyer, uint256 amount);
    event SetETHRate(uint256 newRate);

    constructor(uint256 eth_rate, address payable wallet, IERC20 icotoken) {
        ETH_rate = eth_rate;
        _wallet = wallet;
        token = icotoken;
    }

    function setETHRate(uint256 new_rate) public onlyOwner {
        ETH_rate = new_rate;
        emit SetETHRate(new_rate);
    }

    function buyTokenByETH() external payable {
        uint256 ethAmount = msg.value;
        uint256 amount = getTokenAmountETH(ethAmount);
        require(amount > 0, "Amount is zero");
        require(
            token.balanceOf(address(this)) >= amount,
            "Insufficient account balance"
        );
        payable(_wallet).transfer(ethAmount);
        SafeERC20.safeTransfer(token, msg.sender, amount);
        emit BuyTokenByETH(msg.sender, amount);
    }

    function getTokenAmountETH(
        uint256 ETHAmount
    ) public view returns (uint256) {
        return ETHAmount * ETH_rate;
    }

    function withdraw() public onlyOwner {
        uint256 amount = address(this).balance;
        (bool success, ) = _wallet.call{value: amount}("");
        require(success, "Failed to send Ether");
    }
}
