import React from "react";
import Image from "next/image";
import Link from "next/link";
const Footer = () => {
  return (
    <div className="h-[200px] container mx-auto border-y-4 text-white text-2xl   border-orange-400 ">
      <div className=" xl:flex xl:justify-around items-center text-center py-14">
        <div>Get connected with us on social networks</div>
        <div>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/danghoangvinh"
          >
            Linked
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="mx-4"
            href="https://github.com/vinh-vinh"
          >
            Github
          </a>
        </div>
        <div className="flex flex-col">
          <a
            target="_blank"
            rel="noopener noreferrer"
            // href="https://www.youtube.com/@javascriptmastery"
          >
            Youtube Me
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
