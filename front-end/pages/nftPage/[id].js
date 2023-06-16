import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useStateContext } from "@/context/StateContext";
import { getBuyNFT, getListedTokenForId, getTokenURI } from "@/utils/getNFT";
import { GetIpfsUrlFromPinata } from "@/utils/getIpfsUrlFromPinata";
import axios from "axios";
import { Header } from "@/components";
import { ethers } from "ethers";
const id = () => {
  const { getProviderOrSigner } = useStateContext();
  const router = useRouter();
  const tokenId = router.query.id;
  const [data, updateData] = useState({});
  const [dataFetched, updateDataFetched] = useState(false);
  const [message, updateMessage] = useState("");
  const [currAddress, updateCurrAddress] = useState("0x");

  const getNFTData = async (tokenId) => {
    try {
      const provider = await getProviderOrSigner(false);
      const signer = await getProviderOrSigner(true);

      var tokenURI = await getTokenURI(provider, tokenId);

      const listedToken = await getListedTokenForId(provider, tokenId);
      tokenURI = GetIpfsUrlFromPinata(tokenURI);

      let meta = await axios.get(tokenURI);
      meta = meta.data;
      let item = {
        price: meta.price,
        tokenId: tokenId,
        seller: listedToken.seller,
        owner: listedToken.owner,
        image: meta.image,
        name: meta.name,
        description: meta.description,
      };

      updateData(item);
      updateDataFetched(true);
      const addr = await signer.getAddress();
      updateCurrAddress(addr);
    } catch (error) {}
  };

  const buyNFT = async (tokenId) => {
    try {
      const signer = await getProviderOrSigner(true);
      const salePrice = ethers.utils.parseUnits(data.price, "ether");
      updateMessage("Buying the NFT... Please Wait (Upto 5 mins)");
      //run the executeSale function
      await getBuyNFT(signer, tokenId, salePrice);

      alert("You successfully bought the NFT!");
      updateMessage("");
    } catch (e) {
      alert("Upload Error" + e);
    }
  };

  if (!dataFetched) getNFTData(tokenId);
  if (typeof data.image == "string")
    data.image = GetIpfsUrlFromPinata(data.image);

  return (
    <div className="h-screen">
      <div className="h-1/3">
        <Header />
      </div>
      <div className="h-2/3">
        {data === null ? (
          <h1 className="flex justify-center items-center">Loading....</h1>
        ) : (
          <div className=" flex justify-center">
            <img src={data.image} alt="" className="w-2/5" />
            <div className="text-xl ml-20 space-y-8 text-white shadow-2xl rounded-lg border-2 p-5">
              <div>Name: {data.name}</div>
              <div>Description: {data.description}</div>
              <div>
                Price: <span className="">{data.price + " ETH"}</span>
              </div>
              <div>
                Owner: <span className="text-sm">{data.owner}</span>
              </div>
              <div>
                Seller: <span className="text-sm">{data.seller}</span>
              </div>
              <div>
                {currAddress != data.owner && currAddress != data.seller ? (
                  <button
                    className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
                    onClick={() => buyNFT(tokenId)}
                  >
                    Buy this NFT
                  </button>
                ) : (
                  <div className="text-emerald-700">
                    You are the owner of this NFT
                  </div>
                )}

                <div className="text-green text-center mt-3">{message}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default id;
