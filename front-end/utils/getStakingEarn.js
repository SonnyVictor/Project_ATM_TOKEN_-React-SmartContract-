import { Contract, ethers, utils } from "ethers";
import {
  STAKING_EARN_CONTRACT_ABI,
  STAKING_EARN_CONTRACT_ADDRESS,
} from "../constants";

export const getStaking = async (signer, time, amountValue) => {
  const valueprice = ethers.utils.parseEther(amountValue.toString());
  const stakingearnContract = new Contract(
    STAKING_EARN_CONTRACT_ADDRESS,
    STAKING_EARN_CONTRACT_ABI,
    signer
  );

  const tx = await stakingearnContract.stake(time, { value: valueprice });
  await tx.wait();
};

export const getRateReward = async (provider, key) => {
  const stakingearnContract = new Contract(
    STAKING_EARN_CONTRACT_ADDRESS,
    STAKING_EARN_CONTRACT_ABI,
    provider
  );

  const tx = await stakingearnContract.getReward(key);
  return tx;
};

export const getUserStake = async (signer) => {
  const stakingearnContract = new Contract(
    STAKING_EARN_CONTRACT_ADDRESS,
    STAKING_EARN_CONTRACT_ABI,
    signer
  );
  const tx = await stakingearnContract.getUserStake();
  // await tx.wait();

  return tx;
};

export const getClaimStake = async (signer) => {
  const stakingearnContract = new Contract(
    STAKING_EARN_CONTRACT_ADDRESS,
    STAKING_EARN_CONTRACT_ABI,
    signer
  );
  const tx = await stakingearnContract.claim();
  await tx.wait();
};
