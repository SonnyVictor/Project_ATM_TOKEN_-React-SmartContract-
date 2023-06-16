import { Contract, utils } from "ethers";
import {
  TOKEN_ATM_CONTRACT_ABI,
  TOKEN_ATM_CONTRACT_ADDRESS,
  EXCHANGE_CONTRACT_ABI,
  EXCHANGE_CONTRACT_ADDRESS,
} from "../constants";

export const addLiquidity = async (
  signer,
  addAtmAmountWei,
  addEtherAmountWei
) => {
  try {
    const tokenContract = new Contract(
      TOKEN_ATM_CONTRACT_ADDRESS,
      TOKEN_ATM_CONTRACT_ABI,
      signer
    );
    const exchangeContract = new Contract(
      EXCHANGE_CONTRACT_ADDRESS,
      EXCHANGE_CONTRACT_ABI,
      signer
    );
    let tx = await tokenContract.approve(
      EXCHANGE_CONTRACT_ADDRESS,
      addAtmAmountWei.toString()
    );
    await tx.wait();
    tx = await exchangeContract.addLiquidity(addAtmAmountWei, {
      value: addEtherAmountWei,
    });
    await tx.wait();
  } catch (err) {
    console.error(err);
  }
};

export const calculateATM = async (
  _addEther = "0",
  etherBalanceContract,
  atmTokenReserve
) => {
  const _addEtherAmountWei = utils.parseEther(_addEther);

  const cryptoDevTokenAmount = _addEtherAmountWei
    .mul(atmTokenReserve)
    .div(etherBalanceContract);
  return cryptoDevTokenAmount;
};
