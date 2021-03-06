import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
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
  headerItem: `text-white px-4 font-bold text-[#c8cacd] hover:text-white cursor-pointer`,
  headerIcon: `text-[#8a939b] text-3xl font-black px-4 hover:text-white cursor-pointer`,
};

const Header = () => {
  return (
    <div className={style.wrapper}>
      <Link href="/">
        <div className={style.logoContainer}>
          <Image src={openseaLogo} height={40} width={40}></Image>
          <div className={style.logoText}>Nex</div>
          <span className={style.logoText2}>Trade</span>
        </div>
      </Link>
      <div className={style.searchBar}>
        <div className={style.searchIcon}></div>
        <AiOutlineSearch color="#d6d6d6"></AiOutlineSearch>
        <input
          className={style.searchInput}
          placeholder="Search items, collections, accounts, or something..."
        ></input>
      </div>
      <div className={style.headerItems}>
        <Link href="/">
          <div className={style.headerItem}>Create</div>
        </Link>
        {/* <Link href="/collections/0x2Ef3aD81Aa6Cff6cC12566FD5698a2e522eb8D53">
          <div className={style.headerItem}>Collections</div>
        </Link> */}
        <Link href="/collections/allCollection">
          <div className={style.headerItem}>Collections</div>
        </Link>
        <Link href="/">
          <div className={style.headerItem}>Stats</div>
        </Link>
        <div className={style.headerIcon}>
          <CgProfile></CgProfile>
        </div>
        <div className={style.headerIcon}>
          <MdOutlineAccountBalanceWallet></MdOutlineAccountBalanceWallet>
        </div>
      </div>
    </div>
  );
};

export default Header;
