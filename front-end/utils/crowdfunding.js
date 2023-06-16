import { Contract, ethers, utils } from "ethers";
import {
  CROWD_FUNDING_CONTRACT_ABI,
  CROWD_FUNDING_CONTRACT_ADDRESS,
} from "../constants";

export const pledgeCrowdFunding = async (signer, id, value) => {
  const valueprice = ethers.utils.parseEther(value.toString());

  const crowfundingContract = new Contract(
    CROWD_FUNDING_CONTRACT_ADDRESS,
    CROWD_FUNDING_CONTRACT_ABI,
    signer
  );

  const tx = await crowfundingContract.pledge(id, {
    gasLimit: 300000,
    value: valueprice,
  });

  await tx.wait();
};

export const unpledgeCrowdFunding = async (signer, id, value) => {
  const valueprice = ethers.utils.parseEther(value.toString());

  const crowfundingContract = new Contract(
    CROWD_FUNDING_CONTRACT_ADDRESS,
    CROWD_FUNDING_CONTRACT_ABI,
    signer
  );

  const tx = await crowfundingContract.unpledge(id, valueprice);

  await tx.wait();
};

export const getCampaigns = async (provider, id) => {
  const crowfundingContract = new Contract(
    CROWD_FUNDING_CONTRACT_ADDRESS,
    CROWD_FUNDING_CONTRACT_ABI,
    provider
  );

  const tx = await crowfundingContract.campaigns(id);
  // await tx.wait();
  return tx;
};
