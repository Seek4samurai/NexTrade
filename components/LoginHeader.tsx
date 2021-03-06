import Image from "next/image";
import Link from "next/link";
import React from "react";
import openseaLogo from "../assets/opensea.png";

const style = {
  wrapper: `bg-[#1e272e] w-full px-[3rem] py-[0.8rem] flex `,
  logoContainer: `flex items-center cursor-pointer`,
  logoText: ` ml-[0.8rem] text-white font-semibold text-2xl`,
  logoText2: ` text-[#ffa801] font-bold text-3xl`,
  searchBar: `flex flex-1 mx-[0.8rem] w-max-[520px] items-center bg-transparent rounded-[0.8rem]`,
  searchIcon: `text-[#8a939b] mx-3 font-bold text-lg`,
  searchInput: `h-[2.6rem] w-full border-0 bg-transparent outline-0 ring-0 px-2 pl-3 text-[#fff] placeholder:text-[#c3c3c3] hover:placeholder:text-[#fff]`,
  headerItems: ` flex items-center justify-end`,
  headerItem: `text-white px-4 font-bold text-white`,
  headerIcon: `text-[#8a939b] text-3xl font-black px-4 hover:text-white cursor-pointer`,
};

const LoginHeader = () => {
  return (
    <div className={style.wrapper}>
      <Link href="/">
        <div className={style.logoContainer}>
          <Image src={openseaLogo} height={40} width={40}></Image>
          <div className={style.logoText}>Nex</div>
          <span className={style.logoText2}>Trade</span>
        </div>
      </Link>
      <div className={style.searchBar}></div>
      <div className={style.headerItems}>
        <div className={style.headerItem}>
          An NFT marketplace for awesome investers
        </div>
      </div>
    </div>
  );
};

export default LoginHeader;
