const hre = require("hardhat");

const fs = require("fs");
async function main() {
  // const TokenATM = await hre.ethers.getContractFactory("TokenATM");
  // const tokenatm = await TokenATM.deploy();
  // await tokenatm.deployed();
  // console.log("Address token ATM", tokenatm.address);
  // const RandomNumber = await hre.ethers.getContractFactory("RandomNumber");
  // const randomnumber = await RandomNumber.deploy(2431);
  // await randomnumber.deployed();
  // const RandomNumber = await hre.ethers.getContractFactory("RandomNumber");
  // const randomnumber = await RandomNumber.deploy(2431);
  // await randomnumber.deployed();
  // console.log("randomnumber ATM", randomnumber.address);
  // const ClaimToken = await hre.ethers.getContractFactory("ClaimToken");
  // const claimtoken = await ClaimToken.deploy();
  // await claimtoken.deployed();
  // console.log("claimtoken ATM", claimtoken.address);
  // const cryptoDevTokenAddress = "0xb47c4bf566d4d7ddf0a68f37288fb8b82d724efc";
  // const exchangeContract = await ethers.getContractFactory("Exchange");
  // const deployedExchangeContract = await exchangeContract.deploy(
  //   cryptoDevTokenAddress
  // );
  // await deployedExchangeContract.deployed();
  // // print the address of the deployed contract
  // console.log("Exchange Contract Address:", deployedExchangeContract.address);
  // const crowdsale = await ethers.getContractFactory("CrowdSale");
  // const deployedCrowdsale = await crowdsale.deploy(
  //   10000,
  //   "0x6A292cacEfaD3d1898184379f428ac9fd61a7804",
  //   "0xb47C4Bf566D4d7Ddf0a68f37288Fb8B82d724eFc"
  // );
  // await deployedCrowdsale.deployed();
  // // print the address of the deployed contract
  // console.log("Exchange Contract Address:", deployedCrowdsale.address);
  // const crowdfunding = await ethers.getContractFactory("CrowdFunding");
  // const deployedCrowdFunding = await crowdfunding.deploy();
  // await deployedCrowdFunding.deployed();
  // // print the address of the deployed contract
  // console.log(
  //   "deployedCrowdFunding Contract Address:",
  //   deployedCrowdFunding.address
  // );
  // const stakingearn = await ethers.getContractFactory("StakingEarn");
  // const deployedStakingearn = await stakingearn.deploy();
  // await deployedStakingearn.deployed();
  // // print the address of the deployed contract
  // console.log(
  //   "deployedStakingearn Contract Address:",
  //   deployedStakingearn.address
  // );

  const Marketplace = await hre.ethers.getContractFactory("NFTMarketplace");
  const marketplace = await Marketplace.deploy();

  await marketplace.deployed();

  console.log("marketplace", marketplace.address);

  const data = {
    address: marketplace.address,
    abi: JSON.parse(marketplace.interface.format("json")),
  };
  fs.writeFileSync("./src/Marketplace.json", JSON.stringify(data));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
