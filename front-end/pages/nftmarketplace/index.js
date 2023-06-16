import { Header } from "@/components";
// import { useStateContext } from "@/context/StateContext";
import React, { useEffect, useState } from "react";
import { useStateContext } from "../../context/StateContext";
import { getAllNFTs, getTokenURI } from "@/utils/getNFT";
import Link from "next/link";
import NFTTitle from "@/components/NFTTitle";
import { GetIpfsUrlFromPinata } from "@/utils/getIpfsUrlFromPinata";
import { ethers } from "ethers";
import axios from "axios";

const MarketPlace = () => {
  const { getProviderOrSigner } = useStateContext();
  const [data, updateData] = useState([]);
  const [dataFetched, updateFetched] = useState(false);

  const [loading, setLoading] = useState(true);

  const getHandleAllNFTs = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const provider = await getProviderOrSigner(false);
      let transition = await getAllNFTs(signer);

      const items = await Promise.all(
        transition.map(async (i) => {
          var tokenURI = await getTokenURI(provider, i.tokenId);

          tokenURI = GetIpfsUrlFromPinata(tokenURI);
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
          return item;
        })
      );

      updateFetched(true);
      updateData(items);
    } catch (error) {
      console.log("getHandleAllNFTs", error);
    }
  };

  useEffect(() => {
    if (!dataFetched) getHandleAllNFTs();
  }, []);
  return (
    <div className="h-scren">
      <div className="h-1/3">
        <Header />
      </div>
      <div className="flex flex-col h-2/3 pt-52 w-full justify-center items-center text-white font-semibold">
        <div className="flex justify-between items-center  space-x-5">
          <span className="underline decoration-orange-300">MarketPlace</span>
          <Link href={"/sellnft"}>
            <span>List My NFT</span>
          </Link>
          <Link href={"/nftprofile"}>
            <span>Profile</span>
          </Link>
        </div>

        {!dataFetched ? (
          <div className="flex justify-center items-center text-4xl">
            Loading...
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {data.map((value, index) => {
              return <NFTTitle data={value} key={index} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketPlace;
