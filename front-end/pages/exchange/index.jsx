import React, { useEffect, useState, useMemo } from "react";
import styles from "./styles.module.css";
import { BigNumber, utils } from "ethers";
import { useStateContext } from "../../context/StateContext";
import {
  getAtmTokensBalance,
  getEtherBalance,
  getLPTokensBalance,
  getReserveOfAtmTokens,
} from "@/utils/getAmounts";
import { addLiquidity, calculateATM } from "@/utils/addLiquidity";
import { removeLiquidity, getTokensAfterRemove } from "@/utils/removeLiquidity";
import { getAmountOfTokensReceivedFromSwap, swapTokens } from "@/utils/swap";
import { Header } from "@/components";
import Image from "next/image";
import ImageLiquid from "../../utils/image/liquidStakingBunny.png";

const ExchangePage = () => {
  const {
    ATMBalance,
    walletConnected,
    connectWallet,
    ethBalance,
    getProviderOrSigner,
  } = useStateContext();

  const [loading, setLoading] = useState(false);
  const [liquidityTab, setLiquidityTab] = useState(true);
  const zero = BigNumber.from(0);
  const [lpBalance, setLPBalance] = useState(zero);
  const [reservedATM, setReservedATM] = useState(zero);
  const [etherBalanceContract, setEtherBalanceContract] = useState(zero);
  const [removeATM, setRemoveATM] = useState(zero);
  const [removeEther, setRemoveEther] = useState(zero);
  const [removeLPTokens, setRemoveLPTokens] = useState("0");
  const [swapAmount, setSwapAmount] = useState("");
  const [ethSelected, setEthSelected] = useState(true);
  const [tokenToBeReceivedAfterSwap, settokenToBeReceivedAfterSwap] =
    useState(zero);

  // Variable function
  const [addEther, setAddEther] = useState(zero);
  const [addAtmTokens, setAddAtmTokens] = useState(zero);
  const getAmounts = async () => {
    try {
      const provider = await getProviderOrSigner(false);
      const signer = await getProviderOrSigner(true);
      const address = await signer.getAddress();
      // Get amount instant of Contract Exchange

      // LP Balance of contract Exchange
      const _lpBalance = await getLPTokensBalance(provider, address);
      // Contract Exchange is have amount ATM
      const _reservedATM = await getReserveOfAtmTokens(provider);
      // Contract Exchange is have amount ETH
      const _ethBalanceContract = await getEtherBalance(provider, null, true);

      setLPBalance(_lpBalance);
      setReservedATM(_reservedATM);
      setEtherBalanceContract(_ethBalanceContract);
    } catch (error) {
      console.error(error);
    }
  };

  const _addLiquidity = async () => {
    try {
      const addEtherWei = utils.parseEther(addEther.toString());
      // Check if the values are zero
      if (!addAtmTokens.eq(zero) && !addEtherWei.eq(zero)) {
        const signer = await getProviderOrSigner(true);
        setLoading(true);
        await addLiquidity(signer, addAtmTokens, addEtherWei);
        setLoading(false);
        setAddAtmTokens(zero);
        await getAmounts();
      } else {
        setAddAtmTokens(zero);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      setAddAtmTokens(zero);
    }
  };

  const _removeLiquidity = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      // Convert the LP tokens entered by the user to a BigNumber
      const removeLPTokensWei = utils.parseEther(removeLPTokens);
      setLoading(true);
      // Call the removeLiquidity function from the `utils` folder
      await removeLiquidity(signer, removeLPTokensWei);
      setLoading(false);
      await getAmounts();
      setRemoveATM(zero);
      setRemoveEther(zero);
    } catch (err) {
      console.error(err);
      setLoading(false);
      setRemoveATM(zero);
      setRemoveEther(zero);
    }
  };

  const _swapTokens = async () => {
    try {
      // Convert the amount entered by the user to a BigNumber using the `parseEther` library from `ethers.js`
      const swapAmountWei = utils.parseEther(swapAmount);
      // Check if the user entered zero
      // We are here using the `eq` method from BigNumber class in `ethers.js`
      if (!swapAmountWei.eq(zero)) {
        const signer = await getProviderOrSigner(true);
        setLoading(true);
        // Call the swapTokens function from the `utils` folder
        await swapTokens(
          signer,
          swapAmountWei,
          tokenToBeReceivedAfterSwap,
          ethSelected
        );
        setLoading(false);
        // Get all the updated amounts after the swap
        await getAmounts();
        setSwapAmount("");
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      setSwapAmount("");
    }
  };

  const _getTokensAfterRemove = async (_removeLPTokens) => {
    try {
      const provider = await getProviderOrSigner();
      const removeLPTokenWei = utils.parseEther(_removeLPTokens);
      const _ethBalance = await getEtherBalance(provider, null, true);
      const cryptoAtmTokenReserve = await getReserveOfAtmTokens(provider);
      const { _removeEther, _removeATM } = await getTokensAfterRemove(
        provider,
        removeLPTokenWei,
        _ethBalance,
        cryptoAtmTokenReserve
      );
      setRemoveEther(_removeEther);
      setRemoveATM(_removeATM);
    } catch (err) {
      console.error(err);
    }
  };

  const _getAmountOfTokensReceivedFromSwap = async (_swapAmount) => {
    try {
      // Convert the amount entered by the user to a BigNumber using the `parseEther` library from `ethers.js`
      const _swapAmountWEI = utils.parseEther(_swapAmount.toString());
      // Check if the user entered zero
      // We are here using the `eq` method from BigNumber class in `ethers.js`
      if (!_swapAmountWEI.eq(zero)) {
        const provider = await getProviderOrSigner();
        // Get the amount of ether in the contract
        const _ethBalance = await getEtherBalance(provider, null, true);
        // Call the `getAmountOfTokensReceivedFromSwap` from the utils folder
        const amountOfTokens = await getAmountOfTokensReceivedFromSwap(
          _swapAmountWEI,
          provider,
          ethSelected,
          _ethBalance,
          reservedATM
        );
        settokenToBeReceivedAfterSwap(amountOfTokens);
      } else {
        settokenToBeReceivedAfterSwap(zero);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAmounts();
  }, []);

  const renderButton = () => {
    // If we are currently waiting for something, return a loading button
    if (loading) {
      return <button className={styles.button}>Loading...</button>;
    }

    if (liquidityTab) {
      return (
        <div>
          <div className={styles.description}>
            You have:
            <br />
            {/* Convert the BigNumber to string using the formatEther function from ethers.js */}
            {utils.formatEther(ATMBalance)} Crypto ATM-Tokens
            <br />
            {utils.formatEther(ethBalance)} Ether
            <br />
            {utils.formatEther(lpBalance)} Crypto Dev LP tokens
          </div>
          <div>
            {utils.parseEther(reservedATM.toString()).eq(zero) ? (
              <div>
                <input
                  type="number"
                  placeholder="Amount Of Ether"
                  onChange={(e) => setAddEther(e.target.value || "0")}
                  className={styles.input}
                />
                <input
                  type="number"
                  placeholder="Amount of ATM tokens"
                  onChange={(e) =>
                    setAddAtmTokens(
                      BigNumber.from(utils.parseEther(e.target.value || "0"))
                    )
                  }
                  className={styles.input}
                />
                <button className={styles.button1} onClick={_addLiquidity}>
                  Add
                </button>
              </div>
            ) : (
              <div>
                <input
                  type="number"
                  placeholder="Amount of Ether"
                  onChange={async (e) => {
                    setAddEther(e.target.value || "0");
                    const _addAtmTokens = await calculateATM(
                      e.target.value || "0",
                      etherBalanceContract,
                      reservedATM
                    );
                    setAddAtmTokens(_addAtmTokens);
                  }}
                  className={styles.input}
                />
                <div className={styles.inputDiv}>
                  {`You will need ${utils.formatEther(addAtmTokens)} Crypto ATM
                  Tokens`}
                </div>
                <button className={styles.button1} onClick={_addLiquidity}>
                  Add
                </button>
              </div>
            )}

            <div>
              <input
                type="number"
                placeholder="Amount of LP Tokens"
                onChange={async (e) => {
                  setRemoveLPTokens(e.target.value || "0");
                  await _getTokensAfterRemove(e.target.value || "0");
                }}
                className={styles.input}
              />
              <div className={styles.inputDiv}>
                {/* Convert the BigNumber to string using the formatEther function from ethers.js */}
                {`You will get ${utils.formatEther(removeATM)} Crypto
              ATM Tokens and ${utils.formatEther(removeEther)} Eth`}
              </div>
              <button className={styles.button1} onClick={_removeLiquidity}>
                Remove
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <input
            type="number"
            placeholder="Amount"
            onChange={async (e) => {
              setSwapAmount(e.target.value || "");
              await _getAmountOfTokensReceivedFromSwap(e.target.value || "0");
            }}
            className={styles.input}
            value={swapAmount}
          />
          <select
            className={styles.select}
            name="dropdown"
            id="dropdown"
            onChange={async () => {
              setEthSelected(!ethSelected);
              await _getAmountOfTokensReceivedFromSwap(0);
              setSwapAmount("");
            }}
          >
            <option value="eth">Ethereum</option>
            <option value="cryptoDevToken">Crypto ATM-Token</option>
          </select>
          <br />
          <div className={styles.inputDiv}>
            {ethSelected
              ? `You will get ${utils.formatEther(
                  tokenToBeReceivedAfterSwap
                )} Crypto ATM Tokens`
              : `You will get ${utils.formatEther(
                  tokenToBeReceivedAfterSwap
                )} Eth`}
          </div>
          <button className={styles.button1} onClick={_swapTokens}>
            Swap
          </button>
        </div>
      );
    }
  };

  return (
    <div>
      <Header />
      <div className={`${styles.main} py-52 text-white font-medium `}>
        <div>
          <h1 className={styles.title}>Welcome to ATM-Tokens Exchange!</h1>
          <div className={styles.description}>
            Exchange Ethereum &#60;&#62; Crypto ATM-Tokens
          </div>
          <div>
            <button
              className={styles.button}
              onClick={() => {
                setLiquidityTab(true);
              }}
            >
              Liquidity
            </button>
            <button
              className={styles.button}
              onClick={() => {
                setLiquidityTab(false);
              }}
            >
              Swap
            </button>
          </div>
          {renderButton()}
        </div>
        <div>
          <Image
            src={ImageLiquid}
            height={500}
            width={500}
            alt="image exchange"
          />
        </div>
      </div>
    </div>
  );
};

export default ExchangePage;
