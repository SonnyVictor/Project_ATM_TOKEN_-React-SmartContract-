import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import IMGCrowdFunding from "../utils/image/pngwing.webp";
import { useStateContext } from "@/context/StateContext";
import {
  getCampaigns,
  pledgeCrowdFunding,
  unpledgeCrowdFunding,
} from "@/utils/crowdfunding";
import { BigNumber, ethers, utils } from "ethers";

const CrowdFunding = () => {
  const { getProviderOrSigner, walletConnected, connectWallet, getAmounts } =
    useStateContext();
  const zero = BigNumber.from(0);
  const [inputValue, setInputValue] = useState(zero);
  const [loading, setLoading] = useState(false);
  const [loadingunpledge, setLoadingUnpledge] = useState(false);

  // const [startAT, setStartAT] = useState();
  const [endAt, setEndAt] = useState(zero);
  const [goal, setGoal] = useState(zero);
  const [pledged, setPledged] = useState(zero);
  const handleInputChange = useCallback(
    (e) => {
      e.preventDefault();
      const value = e.target.value;
      setInputValue(value);
    },
    [inputValue]
  );

  const handleInvest = async (id, value) => {
    try {
      const signer = await getProviderOrSigner(true);
      setLoading(true);
      await pledgeCrowdFunding(signer, id, value);
      setLoading(false);
      getCamp();
      setInputValue(0);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setInputValue(0);
    }
  };
  const handleUnInves = async (id, value) => {
    try {
      const signer = await getProviderOrSigner(true);
      setLoadingUnpledge(true);
      await unpledgeCrowdFunding(signer, id, value);
      setLoadingUnpledge(false);
      getCamp();
      setInputValue(0);
    } catch (error) {
      console.log(error);
      setLoadingUnpledge(false);
      setInputValue(0);
    }
  };

  const getCamp = async () => {
    try {
      const provider = await getProviderOrSigner(false);
      const tx = await getCampaigns(provider, 1);
      setEndAt(tx.endAt);
      setPledged(tx.pledged);
      setGoal(tx.goal);
    } catch (error) {}
  };

  useEffect(() => {
    getCamp();
  }, [walletConnected, connectWallet, getAmounts]);
  // console.log("End", endAt);

  const date = new Date(endAt * 1000);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return (
    <div
      id="CROWDFUNDING"
      className="relative container h-2/3 pt-44 mx-auto w-full md:px-20 xl:px-64   "
    >
      <h1 className="text-6xl  container mx-auto text-orange-200 font-black">
        CROWD FUNDING
      </h1>
      <div className="flex flex-col md:flex-row justify-around items-center bg-gray-700">
        <div className="flex flex-col items-start space-y-4 md:w-1/2">
          <span className="text-4xl text-yellow-100 font-semibold">
            Please invest in us, thank you.
          </span>
          <span className="text-xl text-white font-light underline max-w-xs">
            Determining whether we will scam or abandon the project is currently
            unknown.
          </span>
          <input
            type="number"
            id="success"
            min="0"
            step="0.01"
            className="bg-green-50 border border-white text-orange-400 dark:text-orange-300 placeholder-yellow-500 dark:placeholder-green-500 text-xl rounded-lg focus:ring-green-500 focus:border-green-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-green-500"
            placeholder="Price ETH"
            value={inputValue}
            onChange={handleInputChange}
          />
          {loading ? (
            <button className="btn w-80">Loading...</button>
          ) : (
            <button
              className="btn w-80"
              onClick={() => handleInvest(1, inputValue)}
            >
              Invest
            </button>
          )}

          {loadingunpledge ? (
            <button className="btn bg-yellow-100 text-black w-80">
              Loading ...
            </button>
          ) : (
            <button
              className="btn bg-yellow-100 text-black w-80"
              onClick={() => handleUnInves(1, inputValue)}
            >
              Unpledge
            </button>
          )}

          <div className="flex justify-between w-80">
            <div className="flex flex-col justify-around items-start text-xl text-white font-medium">
              <div className="flex flex-col py-3">
                <span className="text-yellow-100">Funds Raised ETH</span>
                <span className="text-orange-200">
                  {utils.formatEther(pledged)}
                </span>
              </div>

              <div className="flex flex-col py-3">
                <span className="text-yellow-100">Funding Goal ETH</span>
                <span className="text-orange-200">
                  {utils.formatEther(goal)}
                </span>
              </div>
            </div>

            <div className="flex flex-col py-3">
              <span className="text-yellow-100">Duration && Time End</span>
              <span className="text-orange-200">
                {day}--{month}--{year}
              </span>
            </div>
          </div>
        </div>
        <Image
          src={IMGCrowdFunding}
          width={500}
          className="md:w-1/2 transition-all ease-linear animate-pulse"
          style={{ objectFit: "contain" }}
          alt="IMG CrowdFunding"
        />
      </div>
    </div>
  );
};

export default CrowdFunding;
