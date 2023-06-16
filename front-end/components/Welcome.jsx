import React from "react";
import Image from "next/image";
import ImageWelcomBank from "../utils/image/BankBlockChain.webp";
import { lobster } from "../utils/font/font";
const Welcome = () => {
  return (
    <div
      className={`${lobster.className} h-1/2 container mx-auto flex flex-row justify-between items-center `}
    >
      <div className="flex flex-col items-center text-white">
        <div className="flex items-center">
          <span className="text-xl font-mono text-gray-300 mr-2">
            Address Token:
          </span>
          <span className="text-xl font-mono text-orange-300 break-all">
            0xb47C4Bf566D4d7Ddf0a68f37288Fb8B82d724eFc
          </span>
        </div>
        <div className="flex flex-col items-center mt-8 max-[975px]:items-start">
          <span className="text-4xl font-mono font-bold text-orange-200  ">
            Welcome TO
          </span>
          <span className="font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
            ATM TOKEN
          </span>
        </div>
        <span className="text-xl font-semibold mt-4">
          The blockchain banking system that is clear and transparent
        </span>
      </div>

      <div>
        <Image
          src={ImageWelcomBank}
          height={500}
          width={700}
          alt="Image Bank Future"
          style={{ objectFit: "contain" }}
          className="rounded-2xl shadow-2xl shadow-orange-300/100"
        />
      </div>
    </div>
  );
};

export default Welcome;
