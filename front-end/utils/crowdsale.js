import { Contract, ethers, utils } from "ethers";
import {
  CROWD_SALE_CONTRACT_ABI,
  CROWD_SALE_CONTRACT_ADDRESS,
} from "../constants";

export const buyICO = async (signer, price) => {
  const valueprice = ethers.utils.parseEther(price.toString());
  const buyICOContract = new Contract(
    CROWD_SALE_CONTRACT_ADDRESS,
    CROWD_SALE_CONTRACT_ABI,
    signer
  );
  const tx = await buyICOContract.buyTokenByETH({
    gasLimit: 300000,
    value: valueprice,
  });
  await tx.wait();
};
