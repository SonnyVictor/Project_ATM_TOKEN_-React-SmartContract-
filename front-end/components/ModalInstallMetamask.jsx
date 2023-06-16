import React, { useState } from "react";
import { useStateContext } from "@/context/StateContext";
import LogoMetaMask from "../utils/image/MetaMask.png";
import Link from "next/link";
import Image from "next/image";
const ModalInstallMetamask = () => {
  const { setModalInstallMetamask, modalInstallMetamask } = useStateContext();
  return (
    <div>
      {modalInstallMetamask && (
        <div className="w-full h-screen fixed top-0 left-0 flex flex-col justify-center items-center">
          <div className="modalContainer  ">
            <div className="title">
              <h1>Are You Sure You Want to Continue?</h1>
            </div>
            <div className="body">
              <p>You have not installed , Pls Install MetaMask</p>
            </div>
            <div className="footer border hover:shadow-2xl hover:shadow-orange-500 ">
              <Link
                href={`https://metamask.io/download/`}
                passHref
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="flex flex-row justify-center items-center ">
                  <Image
                    src={LogoMetaMask}
                    alt="logo metamask"
                    height={200}
                    width={200}
                  />
                  <span className="text-orange-400 font-bold text-2xl underline">
                    Down Load Here
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalInstallMetamask;
