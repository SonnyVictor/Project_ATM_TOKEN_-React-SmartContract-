import React, { memo } from "react";
import BoxReward from "../utils/image/boxreward.webp";
import Image from "next/image";
import Link from "next/link";
import { roboto_mono } from "../utils/font/font";
import ButtonLink from "@/FnComponent/buttonLink";
const Reward = () => {
  return (
    <div
      id="ClaimToken"
      className={`${roboto_mono.className} container mx-auto  h-2/3 pt-44`}
    >
      <h1 className="text-6xl   text-orange-200 font-black  ">
        Claim Token && Reward Gift
      </h1>
      <div className="flex justify-around ">
        <Image
          src={BoxReward}
          width={500}
          alt="Image Box Reward"
          style={{ objectFit: "contain" }}
          className="animate-updown duration-500 ease-linear "
        />

        <div className="flex flex-col  items-start space-y-5">
          <span className="text-white text-4xl animate-[wiggle_1s_ease-in-out_infinite] py-20 font-mono font-black">
            Attention, attention!
          </span>
          <span className="text-white text-2xl">
            Here we have a gift for new participants joining us.
          </span>
          <span className="text-white text-4xl">
            Give{" "}
            <span className="text-red-500 underline underline-offset-[4px]">
              100 tokens
            </span>{" "}
            to new participants.
          </span>
          <span className="text-white text-4xl">
            Give{" "}
            <span className="text-red-500 underline underline-offset-[4px]">
              NFT
            </span>{" "}
            to new participants.
          </span>
          <span className="text-white text-4xl ">
            Reward Gift is up to{" "}
            <span className="text-red-500">10000 tokens</span>
          </span>

          <ButtonLink textHref="reward" classBtn="btn" textBtn="Claim Reward" />
        </div>
      </div>
    </div>
  );
};

export default memo(Reward);
