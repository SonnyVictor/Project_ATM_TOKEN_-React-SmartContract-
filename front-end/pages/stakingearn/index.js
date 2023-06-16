import React, { useCallback, useEffect, useState } from "react";
import { ethers, BigNumber, utils } from "ethers";
import { Card, Header, InfoModal } from "@/components";
import { useStateContext } from "../../context/StateContext";
import {
  getClaimStake,
  getRateReward,
  getStaking,
  getUserStake,
} from "@/utils/getStakingEarn";
import { kanit } from "../../utils/font/font";

const SkakingEarn = () => {
  const { getProviderOrSigner, getAmounts, connectWallet } = useStateContext();
  const zero = BigNumber.from(0);
  const [loading, setLoading] = useState(false);
  const [investment, setInvestment] = useState("10000");
  const [formatinvestment, setFormatInvestment] = useState("10.000");
  const [profit, setProfit] = useState(1000);
  const [rateReward, setRateReward] = useState({});
  const [arrInfoUser, setArrInfoUser] = useState([]);
  const [threeMonthTab, setThreeMonthTab] = useState(true);
  const handleInputChange = useCallback((event) => {
    event.preventDefault();
    setInvestment(event.target.value);
  }, []);
  let people = [];
  const handleStaking = async (time, amountValue) => {
    try {
      const signer = await getProviderOrSigner(true);
      setLoading(true);
      await getStaking(signer, time, amountValue);
      setLoading(false);
      setInvestment("0");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleGetInfo = async () => {
    let arr = [];
    try {
      const signer = await getProviderOrSigner(true);
      const arrayInfo = await getUserStake(signer);
      arrayInfo.forEach((item) => {
        arr.push(item);
      });
    } catch (error) {
      console.log(error);
    }
    setArrInfoUser(arr);
  };

  const handleThreeTabTrue = () => {
    if (threeMonthTab) {
      return rateReward.rateThreeMonthReward / 100;
    } else {
      return rateReward.rateSixMonthReward / 100;
    }
  };

  useEffect(() => {
    const calculateProfit = () => {
      const calculatedProfit = investment * (handleThreeTabTrue() || 0.1);
      setProfit(calculatedProfit);
      const formatInvesment = Number(investment);
      setFormatInvestment(formatInvesment);
    };
    handleThreeTabTrue();
    calculateProfit();
  }, [investment, threeMonthTab]);

  const formartDay = (time) => {
    const date = new Date(time * 1000);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}--${month}--${year}`;
  };

  const handleClaim = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      await getClaimStake(signer);
    } catch (error) {
      console.log("Claim", error);
    }
  };

  useEffect(() => {
    const getRate = async () => {
      try {
        const provider = await getProviderOrSigner(false);
        const ratePromises = [
          getRateReward(provider, 1),
          getRateReward(provider, 2),
        ];
        const rates = await Promise.all(ratePromises);
        setRateReward({
          rateThreeMonthReward: rates[0].toString(),
          rateSixMonthReward: rates[1].toString(),
        });
        // console.log(rateReward.rateThreeMonthReward);
      } catch (error) {
        console.log(error);
      }
    };
    getRate();
    handleGetInfo();
  }, [connectWallet, getProviderOrSigner]);

  return (
    <div>
      <Header />
      <div
        className={`${kanit.className} flex flex-col justify-center items-center h-screen pt-32`}
      >
        <div className="text-white">All User Stake</div>
        <div className="flex justify-evenly">
          <div className="flex flex-col">
            <div className="flex space-x-10">
              <button
                className={
                  "w-24 h-10 text-xl bg-gray-600 text-[#00FF00] font-semibold"
                }
                onClick={() => setThreeMonthTab(true)}
              >
                3 Month
              </button>
              <button
                className="w-24 h-10 text-xl bg-gray-600 text-[#00FF00] font-semibold"
                onClick={() => setThreeMonthTab(false)}
              >
                6 Month
              </button>
            </div>
            {threeMonthTab ? (
              <div className="text-white">
                <div className="savings-container">
                  <div className="savings-card">
                    <h2 className="savings-title">
                      Tiền gửi tiết kiệm 3 tháng
                    </h2>
                    <div className="savings-details">
                      <div className="savings-amount">
                        <p className="savings-amount-label">Số tiền gửi:</p>
                        <p className="savings-amount-value text-base max-w-prose ">
                          ${formatinvestment}
                        </p>
                      </div>
                      <div className="savings-rate">
                        <p className="savings-rate-label">Lãi suất:</p>
                        <p className="savings-rate-value">
                          {rateReward.rateThreeMonthReward}%
                        </p>
                      </div>
                      <div className="savings-profit">
                        <p className="savings-profit-label">Lợi nhuận:</p>
                        <p className="savings-profit-value">
                          {profit == "NaN" ? "1,000" : profit}
                        </p>
                      </div>
                      <div className="relative h-14 w-60 text-white ">
                        <input
                          type="number"
                          value={investment}
                          onChange={handleInputChange}
                          className="peer h-full w-full rounded-[7px] border border-green-500 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-green-500 placeholder-shown:border-t-green-500 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                          placeholder=" "
                        />
                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-green-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-green-500 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-green-500 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-green-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-green-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-green-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                          Amount ETH
                        </label>
                      </div>

                      {loading ? (
                        <button className="btn">Loading..</button>
                      ) : (
                        <button
                          onClick={() => handleStaking(7776000, investment)}
                          className="btn"
                        >
                          Invested
                        </button>
                      )}

                      <button
                        className="btn bg-yellow-100 text-black "
                        onClick={handleClaim}
                      >
                        Claim Saving
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="text-white">
                  <div className="savings-container">
                    <div className="savings-card">
                      <h2 className="savings-title">
                        Tiền gửi tiết kiệm 6 tháng
                      </h2>
                      <div className="savings-details">
                        <div className="savings-amount">
                          <p className="savings-amount-label">Số tiền gửi:</p>
                          <p className="savings-amount-value text-base max-w-prose ">
                            ${formatinvestment}
                          </p>
                        </div>
                        <div className="savings-rate">
                          <p className="savings-rate-label">Lãi suất:</p>
                          <p className="savings-rate-value">
                            {rateReward.rateSixMonthReward}%
                          </p>
                        </div>
                        <div className="savings-profit">
                          <p className="savings-profit-label">Lợi nhuận:</p>
                          <p className="savings-profit-value">
                            {" "}
                            {profit == "NaN" ? "2,000" : profit}
                          </p>
                        </div>
                        <div className="relative h-14 w-60 text-white ">
                          <input
                            type="number"
                            value={investment}
                            onChange={handleInputChange}
                            className="peer h-full w-full rounded-[7px] border border-green-500 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-green-500 placeholder-shown:border-t-green-500 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" "
                          />
                          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-green-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-green-500 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-green-500 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-green-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-green-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-green-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Amount ETH
                          </label>
                        </div>

                        <button
                          onClick={() => handleStaking(15552000, investment)}
                          className="btn"
                        >
                          Invested
                        </button>

                        <button
                          className="btn bg-yellow-100 text-black "
                          onClick={handleClaim}
                        >
                          Claim Saving
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="space-y-3 text-white font-medium">
              <h1 className="text-2xl text-yellow-300 font-extrabold  ">
                Info Stake
              </h1>
              <button className="btn h-10" onClick={() => handleGetInfo()}>
                Get Info
              </button>
              <div>
                {arrInfoUser?.length > 0 ? (
                  arrInfoUser.map((stake, index) => {
                    return (
                      <div
                        key={index}
                        className="space-x-1 space-y-1 py-4 border "
                      >
                        <p>Amount: {utils.formatEther(stake.amount)}</p>
                        <p>
                          Start Timestamp:{" "}
                          {formartDay(stake.startTimestamp.toString())}
                        </p>
                        <p>
                          End Timestamp:{" "}
                          {formartDay(stake.endTimestamp.toString())}
                        </p>
                        <p>Rate Reward:{stake.interest.toString() + "%"}</p>
                        <p>
                          Total Amount:{utils.formatEther(stake.totalAmount)}{" "}
                        </p>
                        <p>
                          Receives:
                          {stake.claim.toString() === "false"
                            ? "Not Received"
                            : "Received"}
                        </p>
                      </div>
                    );
                  })
                ) : (
                  <div>You have not Staking </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkakingEarn;
