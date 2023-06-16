import Image from "next/image";
import React from "react";
import ImageLiquid from "../utils/image/liquidStakingBunny.png";
import Link from "next/link";
const Exchange = () => {
  return (
    <div
      id="AddLiquid"
      className="h-3/4 mt-20 py-20  bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 "
    >
      <div className="flex flex-row justify-center items-center align-middle  ">
        <div>
          <Image
            src={ImageLiquid}
            width={600}
            height={500}
            alt="Image Liquid"
          />
        </div>
        <div className="">
          <Link href={"/exchange"}>
            <button className="btn h-20 rounded-2xl shadow-2xl font-extrabold bg-gradient-to-r from-pink-500  to-yellow-500 hover:from-green-400 hover:to-blue-500 ">
              Add Liquid
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Exchange;
