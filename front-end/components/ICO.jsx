import { ubuntu } from "@/utils/font/font";
import React, { useEffect, useState } from "react";
import { useStateContext } from "@/context/StateContext";

import Image from "next/image";

import LOGOETH from "../utils/image/logoETH.webp";
import BGICO from "../utils/image/bg-ico.webp";
import { buyICO } from "@/utils/crowdsale";
import { getAtmTokensBalance } from "@/utils/getAmounts";
import { BigNumber, ethers, utils } from "ethers";
import { ModalError } from ".";

const ICO = () => {
  const { getProviderOrSigner, walletConnected, connectWallet } =
    useStateContext();
  const zero = BigNumber.from(0);

  const [loading, setLoading] = useState(false);
  const [amountTokenICO, setAmountTokenICO] = useState(zero);
  const priceAmount = ["0.1", "0.2", "0.3"];

  const [isError, setIsError] = useState(false);
  const handleBuyICO = async (value) => {
    try {
      const signer = await getProviderOrSigner(true);
      setLoading(true);
      await buyICO(signer, value);
      getAmountTokenOfICO();
      setLoading(false);
    } catch (error) {
      if (error.code === "ACTION_REJECTED") {
        setIsError(true);
        <ModalError isError={isError} setIsError={setIsError} />;
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
  };
  const getAmountTokenOfICO = async () => {
    try {
      const provider = await getProviderOrSigner(false);
      const valuetokenICO = await getAtmTokensBalance(
        provider,
        "0x97C3E5d41030e945245dAB5D888ae37e58879540"
      );
      setAmountTokenICO(valuetokenICO || zero);
    } catch (error) {}
  };
  useEffect(() => {
    getAmountTokenOfICO();
  }, [walletConnected, connectWallet]);

  return (
    <div id="ICO" className={`${ubuntu.className} h-3/4 pt-44`}>
      <div className="container mx-auto    ">
        <h1 className="text-4xl font-bold text-white">
          Amounts Remaining :{" " + utils.formatEther(amountTokenICO) + "ATM"}
        </h1>
      </div>
      <div
        className={` flex-wrap  container mx-auto  md:flex md:flex-row lg:flex-col  xl:flex-row  sm:flex sm:flex-col   md:justify-around  items-center  text-white font-bold`}
      >
        {priceAmount.map((value, index) => (
          <div
            key={index}
            className="  flex flex-col  justify-evenly align-middle items-center h-[500px] w-96 border-2  rounded-xl border-orange-400"
          >
            <div>
              <Image
                src={BGICO}
                width={400}
                style={{ objectFit: "contain" }}
                alt="IMG Binance"
              />
            </div>
            <Image
              src={LOGOETH}
              width={100}
              className="absolute"
              alt="IMG Bianance"
            />
            <div className="flex flex-col items-center">
              <span className="text-2xl">ETH PACKAGE {index + 1}</span>
              <span>{value * 10000} ATM-TOKEN</span>
              <span>Amount of coins to pay :{value}ETH</span>
              {loading ? (
                <button className="btn w-80 mt-5 bg-yellow-500">
                  Loading....
                </button>
              ) : (
                <button
                  onClick={() => handleBuyICO(value)}
                  className="btn w-80 mt-5 bg-yellow-500"
                >
                  BUY ICO {value} ETH
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      {isError && <ModalError isError={isError} setIsError={setIsError} />}
    </div>
  );
};

export default ICO;
