import Image from "next/image";
import React, { useState, useRef } from "react";
import Slider from "react-slick";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Bank from "../utils/image/intro1.webp";
import Bank2 from "../utils/image/Banking.webp";
import Bank3 from "../utils/image/intro3.webp";
import Bank4 from "../utils/image/blockchain-working.webp";
import CustomInFo from "./CustomInFo";

const SmapleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="absolute right-0 bottom-0 text-4xl   " onClick={onClick}>
      <button className="border text-4xl  border-orange-400 rounded-full text-gray-700 bg-orange-400">
        <AiFillRightCircle />
      </button>
    </div>
  );
};

const Intro = () => {
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <SmapleNextArrow />,
    prevArrow: <SmapleNextArrow />,
  };
  return (
    <div className="h-1/2 text-white flex justify-center items-center pt-48 py-10">
      <div className="container mx-auto h-73 border-2 rounded-2xl border-orange-400  shadow-[0px_0px_20px_0px_rgba(255,175,0,0.56)]">
        <Slider ref={sliderRef} {...settings}>
          <CustomInFo
            image={Bank}
            textTitle="What is web3?"
            contentTitle="Web3 refers to a decentralized version of the internet powered by
          blockchain technology. It includes applications and platforms that
          use cryptocurrencies, NFTs, and DAOs. Web3 enables users to
          interact with decentralized apps for various purposes such as
          music streaming, file storage, investing, and gaming. It offers
          more control, transparency, and opportunities for users,
          revolutionizing the way we use the internet."
          />
          <CustomInFo
            image={Bank4}
            textTitle="Finance Banking"
            contentTitle="
            El Salvador adopted Bitcoin as legal tender in 2021, leading the way for other countries to potentially follow suit. Blockchain technology shows promise in banking, particularly with the development of national cryptocurrencies. These digital currencies allow for peer-to-peer transactions without intermediaries, while still being regulated by central banks. This opens up possibilities for improved efficiency and financial inclusion in the banking sector."
          />
          <CustomInFo
            image={Bank2}
            textTitle="Web3 technology"
            contentTitle="
            Web3 also relies on smart contracts, which are self-executing contracts with predefined rules. Ethereum is the most popular blockchain platform for smart contracts. Smart contracts enable automated and trustless execution of various functions, including financial transactions and potentially other important societal activities like voting and real estate transfers."
          />
        </Slider>
      </div>
    </div>
  );
};

export default Intro;
