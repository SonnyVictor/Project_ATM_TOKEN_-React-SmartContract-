import { Contract, providers } from "ethers";
import { CLAIM_TOKEN_ATM_ADDRESS, CLAIM_TOKEN_ATM_ABI } from "../constants";

export const getUserClaim = async (provider) => {
  try {
    const claimTokenContract = new Contract(
      CLAIM_TOKEN_ATM_ADDRESS,
      CLAIM_TOKEN_ATM_ABI,
      provider
    );

    const addressUserClaim = await claimTokenContract.seeUserClaimed();
    return addressUserClaim;
  } catch (error) {}
};

export const getCountAddressUserClaim = async (provider) => {
  try {
    const claimTokenContract = new Contract(
      CLAIM_TOKEN_ATM_ADDRESS,
      CLAIM_TOKEN_ATM_ABI,
      provider
    );
    const amountUserClaim = await claimTokenContract.getCountAddressUserClaim();
    return amountUserClaim;
  } catch (error) {
    console.log(error);
  }
};

export const claimTokens = async (signer) => {
  const claimTokenContract = new Contract(
    CLAIM_TOKEN_ATM_ADDRESS,
    CLAIM_TOKEN_ATM_ABI,
    signer
  );
  const tx = await claimTokenContract.claimToken();
  await tx.wait();
};

export const getUserWinner = async (provider) => {
  try {
    const claimTokenContract = new Contract(
      CLAIM_TOKEN_ATM_ADDRESS,
      CLAIM_TOKEN_ATM_ABI,
      provider
    );

    const tx = await claimTokenContract.winner();
    return tx;
  } catch (error) {
    consolee.log("get user winner", error);
  }
};
