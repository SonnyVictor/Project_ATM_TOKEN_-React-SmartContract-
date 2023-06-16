import { Contract, utils } from "ethers";
import {
  NFT_MARKETPLACE_CONTRACT_ABI,
  NFT_MARKETPLACE_CONTRACT_ADDRESS,
} from "../constants";

export const getAllNFTs = async (signer) => {
  const nftMarketPlaceContract = new Contract(
    NFT_MARKETPLACE_CONTRACT_ADDRESS,
    NFT_MARKETPLACE_CONTRACT_ABI,
    signer
  );

  const tx = await nftMarketPlaceContract.getAllNFTs();

  return tx;
};

export const getListPrice = async (provider) => {
  const nftMarketPlaceContract = new Contract(
    NFT_MARKETPLACE_CONTRACT_ADDRESS,
    NFT_MARKETPLACE_CONTRACT_ABI,
    provider
  );

  const tx = await nftMarketPlaceContract.getListPrice();

  return tx;
};

export const getcreateToken = async (
  signer,
  metadataURL,
  price,
  listingPrice
) => {
  // const listingPrice = ethers.utils.parseEther(price.toString());

  const nftMarketPlaceContract = new Contract(
    NFT_MARKETPLACE_CONTRACT_ADDRESS,
    NFT_MARKETPLACE_CONTRACT_ABI,
    signer
  );

  const tx = await nftMarketPlaceContract.createToken(metadataURL, price, {
    value: listingPrice,
  });
  await tx.wait();
};

export const getTokenURI = async (provider, index) => {
  const nftMarketPlaceContract = new Contract(
    NFT_MARKETPLACE_CONTRACT_ADDRESS,
    NFT_MARKETPLACE_CONTRACT_ABI,
    provider
  );

  const tx = await nftMarketPlaceContract.tokenURI(index);

  return tx;
};

export const getListedTokenForId = async (provider, index) => {
  const nftMarketPlaceContract = new Contract(
    NFT_MARKETPLACE_CONTRACT_ADDRESS,
    NFT_MARKETPLACE_CONTRACT_ABI,
    provider
  );

  const tx = await nftMarketPlaceContract.getListedTokenForId(index);

  return tx;
};

export const getBuyNFT = async (signer, index, salePrice) => {
  const nftMarketPlaceContract = new Contract(
    NFT_MARKETPLACE_CONTRACT_ADDRESS,
    NFT_MARKETPLACE_CONTRACT_ABI,
    signer
  );
  const tx = await nftMarketPlaceContract.executeSale(index, {
    value: salePrice,
  });

  await tx.wait();
};

export const getMyNFTs = async (signer) => {
  const nftMarketPlaceContract = new Contract(
    NFT_MARKETPLACE_CONTRACT_ADDRESS,
    NFT_MARKETPLACE_CONTRACT_ABI,
    signer
  );
  const tx = await nftMarketPlaceContract.getMyNFTs();

  return tx;
};
