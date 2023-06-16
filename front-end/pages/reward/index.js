import React, { memo, useEffect, useState } from "react";
import { useStateContext } from "@/context/StateContext";
import {
  claimTokens,
  getCountAddressUserClaim,
  getUserClaim,
  getUserWinner,
} from "@/utils/getUserClaim";
import { BigNumber, ethers, utils } from "ethers";
import ReactModal from "react-modal";
import { customStyles } from "@/utils/cssModal";
import { getAtmTokensBalance } from "@/utils/getAmounts";
import { Header } from "@/components";

const Reward = () => {
  const { getProviderOrSigner, connectWallet, walletConnected, getAmounts } =
    useStateContext();
  const zero = BigNumber.from(0);

  const [addressUserClaim, setAddressUserClaim] = useState([]);
  const [amountUserClaim, setAmountUserClaim] = useState(zero);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [balanceClaim, setBalanceClaim] = useState(zero);
  const [winner, setWinner] = useState("");
  const getAddressUserClaim = async () => {
    try {
      const provider = await getProviderOrSigner(false);

      const addressUserClaim = await getUserClaim(provider);
      setAddressUserClaim(addressUserClaim);

      const amountUserClaim = await getCountAddressUserClaim(provider);
      setAmountUserClaim(amountUserClaim || zero);
      const _balanceContractClaim = await getAtmTokensBalance(
        provider,
        "0x48bCE6A01Ba2e32AfB79AEdc008a83711197C982"
      );
      setBalanceClaim(_balanceContractClaim || zero);

      const winnder = await getUserWinner(provider);
      setWinner(winnder);
    } catch (error) {
      console.log(error);
    }
  };
  const claimNow = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      setLoading(true);
      await claimTokens(signer);
      getAddressUserClaim();
      setLoading(false);
    } catch (error) {
      if (error.code === "ACTION_REJECTED") {
        alert("You are Reject Metamask");
        setLoading(false);
      } else {
        setIsErrorModalOpen(true);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getAddressUserClaim();
  }, [walletConnected, getAmounts, connectWallet]);

  return (
    <>
      <Header />
      <div className="text-white h-screen flex flex-col justify-center">
        <div className="flex justify-around text-2xl ">
          <div className="flex flex-col items-center justify-center text-center gap-6">
            <div className="flex flex-col items-center">
              <p>Receives 100 tokens</p>
              <p className="text-4xl font-bold">
                Has a chance to win 10,000 tokens.
              </p>
              <p>{utils.formatEther(balanceClaim)} Tokens On Contract</p>
            </div>
            {loading ? (
              <button className="btn">Loading ...</button>
            ) : (
              <button className="btn" onClick={claimNow}>
                Claim Now
              </button>
            )}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center">
              <h1 className="text-6xl pb-5 ">Player</h1>
              <p className="text-4xl mx-5">{amountUserClaim.toString()}/50</p>
            </div>
            <div className="flex flex-col space-y-3 divide-y-2 text-xl">
              {addressUserClaim?.length > 0 ? (
                addressUserClaim?.map((value, index) => (
                  <div key={index}>
                    <span>
                      {index + 1}:{value}
                    </span>
                  </div>
                ))
              ) : (
                <div>
                  <span>Not User Claim</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-center pt-10 space-x-10 ">
          <div className="">
            <h1 className="text-4xl">Address Lucky</h1>
            <div className="flex flex-col py-5">
              <span>{winner}</span>
            </div>
          </div>
          <div className=" flex flex-col ">
            <span className="text-4xl">Lucky Number Random</span>
            <span className="text-2xl text-red-400">
              None Random Number yet
            </span>
          </div>
        </div>
        <ReactModal
          isOpen={isErrorModalOpen}
          style={customStyles}
          ariaHideApp={false}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-2xl flex items-center justify-center my-3">
              Error
            </h2>
            <button
              className="bg-red-500  rounded-full text-sm w-6 h-6 mb-1 text-white font-bold "
              onClick={() => setIsErrorModalOpen(false)}
            >
              X
            </button>
          </div>

          <p className="text-xl">You have Claimed </p>
        </ReactModal>
      </div>
    </>
  );
};

export default memo(Reward);
