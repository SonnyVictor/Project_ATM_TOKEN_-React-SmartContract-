import React, { useState } from "react";
import { useStateContext } from "../../context/StateContext";
import { getMyNFTs, getTokenURI } from "@/utils/getNFT";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import axios from "axios";
import NFTTitle from "@/components/NFTTitle";
import { Header } from "@/components";

const ProfileNft = () => {
  const { getProviderOrSigner } = useStateContext();

  const [data, updateData] = useState([]);
  const [dataFetched, updateFetched] = useState(false);
  const [address, updateAddress] = useState("0x");
  const [totalPrice, updateTotalPrice] = useState("0");

  const getNFTData = async (tokenId) => {
    try {
      let sumPrice = 0;
      const provider = await getProviderOrSigner(false);
      const signer = await getProviderOrSigner(true);
      const addr = await signer.getAddress();

      let transaction = await getMyNFTs(signer);

      const items = await Promise.all(
        transaction.map(async (i) => {
          const tokenURI = await getTokenURI(provider, i.tokenId);
          let meta = await axios.get(tokenURI);
          meta = meta.data;
          let price = ethers.utils.formatUnits(i.price.toString(), "ether");
          let item = {
            price,
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            image: meta.image,
            name: meta.name,
            description: meta.description,
          };
          sumPrice += Number(price);
          return item;
        })
      );
      updateData(items);
      updateFetched(true);
      updateAddress(addr);
      updateTotalPrice(sumPrice.toPrecision(3));
    } catch (error) {
      console.log(error);
    }
  };
  const router = useRouter();
  const tokenId = router.query.id;

  if (!dataFetched) getNFTData(tokenId);
  return (
    <div className="h-screen">
      <div className="h-screen-1/3">
        <Header />
      </div>
      <div className="profileClass h-2/3">
        <div className="profileClass">
          <div className="flex text-center flex-col mt-11 md:text-2xl text-white">
            {/* <div className="mb-5">
              <h2 className="font-bold">Wallet Address</h2>
              {address}
            </div> */}
          </div>
          <div className="flex flex-row pt-32 text-center justify-center mt-10 md:text-2xl text-white">
            <div>
              <h2 className="font-bold">No. of NFTs</h2>
              {data.length}
            </div>
            <div className="ml-20">
              <h2 className="font-bold">Total Value</h2>
              {totalPrice} ETH
            </div>
          </div>
          <div className="flex flex-col text-center items-center mt-11 text-white">
            <h2 className="font-bold">Your NFTs</h2>
            <div className="flex justify-center flex-wrap max-w-screen-xl">
              {data.map((value, index) => {
                return <NFTTitle data={value} key={index}></NFTTitle>;
              })}
            </div>
            <div className="mt-10 text-xl">
              {data.length == 0
                ? "Oops, No NFT data to display (Are you logged in?)"
                : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileNft;
