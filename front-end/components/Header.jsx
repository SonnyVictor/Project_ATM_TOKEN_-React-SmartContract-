import React, { memo } from "react";
import { useStateContext } from "../context/StateContext";

import { Web3Button } from "@web3modal/react";
import Link from "next/link";
import { ethers, utils } from "ethers";
import { kanit } from "../utils/font/font";
import Image from "next/image";
import logoETH from "../utils/image/logocoinETH.webp";
import logoATM from "../utils/image/logoatm.webp";
import logoATMTOKEN from "../utils/image/atmtoken.webp";
import { FaWallet } from "react-icons/fa";
const Header = () => {
  const {
    ATMBalance,
    walletConnected,
    connectWallet,
    addressWallet,
    ethBalance,
  } = useStateContext();

  const shortenAddress = (address) =>
    `${address?.slice(0, 5)}...${address?.slice(address.length - 4)}`;
  return (
    <header
      className={`${kanit.className}  fixed w-full top-0 left-0 right-0  font-extrabold text-white text-2xl z-50  bg-transparent backdrop-blur `}
    >
      <div className="container mx-auto flex justify-around text-center items-center border-b-2  border-gray-500 py-5">
        <div className="flex justify-center items-center">
          <div className="flex items-center">
            <Link href="/">
              <Image
                src={logoATMTOKEN}
                width={150}
                height={150}
                alt="logo header atm"
              />
            </Link>
          </div>
        </div>
        <div className="items-center text-center">
          {/* {!walletConnected && <Web3Button />} */}
          {!walletConnected && (
            <button onClick={connectWallet}>Connect your wallet</button>
          )}

          {walletConnected && (
            <div className="flex items-center mb-1 space-x-10">
              <div className="flex items-center">
                <Link href={"/exchange"}>
                  <Image
                    src={logoETH}
                    width={28}
                    height={28}
                    className="mx-2 hover:scale-125  transition-all ease-out cursor-pointer	"
                    alt="IMG LOGO Header"
                  />
                </Link>
                <span>
                  {Number.parseFloat(utils.formatEther(ethBalance)).toFixed(4)}
                </span>
              </div>
              <div className="flex items-center">
                <Link href={"/exchange"}>
                  <Image
                    src={logoATM}
                    width={28}
                    height={28}
                    className="mx-2 hover:scale-125  transition-all ease-out cursor-pointer"
                    alt="IMG LOGO Header"
                  />
                </Link>

                <span>
                  {Number.parseFloat(utils.formatEther(ATMBalance)).toFixed(4)}
                </span>
              </div>
              <div className="flex items-center border  w-56 rounded-3xl border-[#1fc7d4]">
                <div className="bg-[white] h-10 w-10 flex justify-center items-center rounded-full mr-4 border-2 border-[#1fc7d4] ">
                  <FaWallet color="#1fc7d4" />
                </div>
                <span className="">{shortenAddress(addressWallet)}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto font-extrabold py-5  text-4xl">
        <ul className="flex cursor-pointer text-xl font-medium space-x-10 ">
          <Link href={"/#AddLiquid"} scroll={false}>
            <li className=" hover:text-orange-400 duration-200  ease-in-out">
              Add Liquid
            </li>
          </Link>

          <Link href={"/#ClaimToken"} scroll={false}>
            <li className=" hover:text-orange-400 duration-200  ease-in-out">
              ClaimToken
            </li>
          </Link>

          <Link href={"/#ICO"} scroll={false}>
            <li className=" hover:text-orange-400  duration-200  ease-in-out">
              Buy ICO
            </li>
          </Link>
          <Link href={"/#CROWDFUNDING"} scroll={false}>
            <li className=" hover:text-orange-400 duration-200  ease-in-out">
              Crowd Funding
            </li>
          </Link>
          <Link href={"/#STAKING"} scroll={false}>
            <li className=" hover:text-orange-400 duration-200  ease-in-out">
              Stacking Earn
            </li>
          </Link>
          <Link href={"/nftmarketplace"}>
            <li className=" hover:text-orange-400 duration-200  ease-in-out">
              Market Place NFT
            </li>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default memo(Header);
