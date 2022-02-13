import Image from "next/image";
import { useWeb3 } from "@3rdweb/hooks";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { client } from "../lib/sanityClient";
import Header from "../components/Header";
import Hero from "../components/Hero";
import openseaLogo from "../assets/opensea.png";
import LoginHeader from "../components/LoginHeader";
import { AiOutlineGithub } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";

const style = {
  bgWrapper: `relative`,
  bgContainer: `before:content-[''] before:bg-red-500 before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[url('https://images.unsplash.com/photo-1507598641400-ec3536ba81bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')] before:bg-cover before:bg-center before:opacity-70 before:blur`,
  contentWrapper: `flex h-screen relative justify-center flex-wrap items-center`,

  TitleContainer: `flex flex-col items-center`,
  logoContainer: `flex flex-row items-center`,
  logoText: ` ml-[0.8rem] text-[#202225] font-semibold text-2xl`,
  logoText2: ` text-[#ffa801] font-bold text-3xl`,

  GitDetails: `text-md text-center text=[#282b2f] font-semibold mt-4 pb-[0.4rem]`,
  GitIcon: `flex flex-col items-center text-5xl`,

  wrapper: ``,
  LoginContainer: `relative max-w-sm rounded shadow-lg bg-[#fff] pl-[1rem] pr-[1rem] pt-[1.8rem] pb-[1.8rem] flex flex-col `,

  walletConnectWrapper: `flex flex-col justify-center items-center `,
  button: `bg-[#2081e2] mt-4 mb-4 p-[0.8rem] text-xl font-semibold rounded-lg cursor-pointer text-black`,
  details: `text-md text-center text=[#282b2f] font-semibold mt-5 pb-[0.7rem]`,
};

const Home: NextPage = () => {
  const welcomeToast = (userName, toastHandler = toast) => {
    toastHandler.success(
      `Welcome back ${userName !== "Unnamed" ? `${userName}` : ` `}!`,
      {
        style: {
          background: "#fff",
          color: "#000",
        },
      }
    );
  };

  const { address, connectWallet } = useWeb3();
  useEffect(() => {
    // if user address doesn't exist
    if (!address) return;
    // return out of it
    // else do the following (below is an IIFE)
    (async () => {
      const userDoc = {
        _type: "users",
        _id: address,
        userName: "Unnamed",
        walletAddress: address,
      };
      const result = await client.createIfNotExists(userDoc);
      welcomeToast(result.userName);
    })();
  }, [address]);

  return (
    <div className={style.wrapper}>
      <Toaster position="bottom-center" reverseOrder={false}></Toaster>

      {address ? (
        <>
          <Head>
            <title>NexTrade</title>
            <meta name="description" content="Buy/Sell NFTs" />
          </Head>
          <Header></Header>
          <Hero></Hero>
        </>
      ) : (
        <>
          <Head>
            <title>NexTrade - Login</title>
            <meta name="description" content="Buy/Sell NFTs" />
          </Head>
          <LoginHeader></LoginHeader>
          <div className={style.bgWrapper}>
            <div className={style.bgContainer}>
              <div className={style.contentWrapper}>
                <div className={style.LoginContainer}>
                  <div className="font-[800] text-[4rem] mb-2 flex justify-center items-center text-center">
                    <div className={style.TitleContainer}>
                      <div className={style.logoContainer}>
                        <Image src={openseaLogo} height={40} width={40}></Image>
                        <div className={style.logoText}>Nex</div>
                        <span className={style.logoText2}>Trade</span>
                      </div>
                      🦊
                    </div>
                  </div>
                  <div className={style.walletConnectWrapper}>
                    <button
                      className={style.button}
                      onClick={() => connectWallet("injected")}
                    >
                      Connect Wallet
                    </button>
                    <div className={style.GitDetails}>Help us improve</div>
                    <a
                      href="https://github.com/seek4samurai/nextrade"
                      target="_blank"
                    >
                      <AiOutlineGithub
                        className={style.GitIcon}
                      ></AiOutlineGithub>
                    </a>
                    <div className={style.details}>
                      Make sure you're using a suitable browser and have
                      Metamask
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
