import token_abi from "./abis/TokenATM_ABI.json";
import claim_abi from "./abis/ClaimToken_ABI.json";
import exchange_abi from "./abis/Exchange_ABI.json";
import crowdsale_abi from "./abis/CrowdSale.json";
import crowdfunding_abi from "./abis/CrowdFunding_ABI.json";
import stakingearn_abi from "./abis/StakingEarn_ABI.json";
import marketplace_abi from "./abis/MarketPlace_ABI.json";
// Abi-Address Token_ATM
export const TOKEN_ATM_CONTRACT_ABI = token_abi;
export const TOKEN_ATM_CONTRACT_ADDRESS =
  "0xb47C4Bf566D4d7Ddf0a68f37288Fb8B82d724eFc";

// Abi-Address Claim_ATM

export const CLAIM_TOKEN_ATM_ADDRESS =
  "0x48bCE6A01Ba2e32AfB79AEdc008a83711197C982";
export const CLAIM_TOKEN_ATM_ABI = claim_abi;

// Abi-Address Exchange_ATM

export const EXCHANGE_CONTRACT_ABI = exchange_abi;
export const EXCHANGE_CONTRACT_ADDRESS =
  "0x51faa838cb81B884db0e9e3559AC1460167BCBBc";

// Abi-Address Crowd_Sale

export const CROWD_SALE_CONTRACT_ABI = crowdsale_abi;
export const CROWD_SALE_CONTRACT_ADDRESS =
  "0x97C3E5d41030e945245dAB5D888ae37e58879540";

// Abi-Address Crowd_Funding
export const CROWD_FUNDING_CONTRACT_ABI = crowdfunding_abi;
export const CROWD_FUNDING_CONTRACT_ADDRESS =
  "0x3c255E9289779B57A7D0fda0266518C20701A678";

// Abi-Address Staking_Earn
export const STAKING_EARN_CONTRACT_ABI = stakingearn_abi;
export const STAKING_EARN_CONTRACT_ADDRESS =
  "0xDf139B283a83CAc4EC6DA18975Eb14Db0F0275A8";

export const NFT_MARKETPLACE_CONTRACT_ABI = marketplace_abi;
export const NFT_MARKETPLACE_CONTRACT_ADDRESS =
  "0x91e6aE05Af3b8baF879cDEFcE5535C12b40EF986";
