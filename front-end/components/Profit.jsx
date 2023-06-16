import React from "react";
import IMGUSER from "../utils/image/userVinh.webp";
import Image from "next/image";
import { ubuntu } from "@/utils/font/font";

const Profit = () => {
  return (
    <div
      className={`${ubuntu.className} flex justify-center w-full container mx-auto py-32 font-bold`}
    >
      <div className="flex justify-around align-middle items-center h-[300px] w-[800px] border-2  text-white rounded-xl border-spacing-5 border-orange-400 ">
        <div className="flex flex-col">
          <Image
            src={IMGUSER}
            width={150}
            style={{ objectFit: "contain" }}
            className="rounded-xl"
            alt="IMG Logo ATM"
          />
          <span>DANG HOANG VINH </span>
          <span>Fresher Front-end </span>
        </div>
        <div className="flex flex-col">
          <span>
            I created this page with the idea of learning and exploring Solidity
            and Web3
          </span>
        </div>
      </div>
    </div>
  );
};

export default Profit;
