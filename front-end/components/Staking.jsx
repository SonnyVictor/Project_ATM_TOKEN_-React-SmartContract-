import React from "react";
import IMGSTAKING from "../utils/image/StakingCrypto.webp";
import Image from "next/image";
import IMACOMPOUND from "../utils/image/aecompund.webp";
import Link from "next/link";

const Staking = () => {
  return (
    <div id="STAKING" className="container mx-auto h-2/3 pt-44  ">
      <h1 className="text-6xl px-16 container mx-auto  text-orange-200 font-black  ">
        Staking
      </h1>
      <div className="flex justify-evenly">
        <div>
          <Image
            src={IMGSTAKING}
            width={800}
            style={{ objectFit: "contain" }}
            className="rounded-xl"
            alt="IMG Logo Staking"
          />
        </div>
        <div className="flex flex-col">
          <Image
            src={IMACOMPOUND}
            width={400}
            style={{ objectFit: "contain" }}
            className="border rounded-lg"
            alt="IMG Logo Staking"
          />
          <span className="max-w-sm text-2xl text-white">
            ATM Token Bank offers you the ability to deposit money with an
            interest rate of{" "}
            <span className="text-red-400">8% for 3 months</span> , and{" "}
            <span className="text-red-400">20% for 6 months</span>
          </span>
          <Link href={"/stakingearn"} scroll={true} replace={false}>
            <button className="btn w-80">View more information</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Staking;
