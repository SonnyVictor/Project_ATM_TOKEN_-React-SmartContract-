import Image from "next/image";
import React from "react";
import { ubuntu } from "@/utils/font/font";

const CustomInFo = ({ image, textTitle, contentTitle, prev, next }) => {
  return (
    <div>
      <div className="flex ">
        <Image
          src={image}
          alt="banner"
          width={1000}
          height={500}
          className="rounded-2xl w-full h-72 "
        />
        <div
          className={`${ubuntu.className} text-white px-10 max-[639px]:hidden sm:hidden md:hidden lg:hidden xl:block 2xl:block`}
        >
          <h1 className="text-4xl font-medium">{textTitle}</h1>
          <span className="text-sm ">{contentTitle}</span>
        </div>
      </div>
    </div>
  );
};

export default CustomInFo;
