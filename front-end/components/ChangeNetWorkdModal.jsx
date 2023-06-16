import React, { useState } from "react";
import { useStateContext } from "@/context/StateContext";
import "./styles.module.css";
const ChangeNetWorkdModal = () => {
  const { openModal, setOpenModal, handleCheckNetWork } = useStateContext();
  return (
    openModal && (
      <div className="w-full h-screen fixed top-0 left-0   flex flex-col justify-center items-center">
        <div className="modalContainer  ">
          <div className="titleCloseBtn">
            <button
              onClick={() => {
                setOpenModal(false);
              }}
            >
              X
            </button>
          </div>
          <div className="title">
            <h1>Are You Sure You Want to Continue?</h1>
          </div>
          <div className="body">
            <p>Pls Change network Sepolia Alchemy testnet chainId 11155111</p>
          </div>
          <div className="footer">
            <button
              onClick={() => {
                setOpenModal(false);
              }}
              id="cancelBtn"
            >
              Cancel
            </button>
            <button onClick={() => handleCheckNetWork()}>Change network</button>
          </div>
        </div>
      </div>
    )
  );
};

export default ChangeNetWorkdModal;
