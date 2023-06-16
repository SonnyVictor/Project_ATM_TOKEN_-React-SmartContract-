import Link from "next/link";
import React from "react";

const buttonLink = ({ textHref, classBtn, textBtn }) => {
  return (
    <div>
      <Link href={textHref}>
        <button className={classBtn}>
          <span>{textBtn}</span>
        </button>
      </Link>
    </div>
  );
};

export default buttonLink;
