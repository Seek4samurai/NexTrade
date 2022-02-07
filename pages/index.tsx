import { useWeb3 } from "@3rdweb/hooks";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { client } from "../lib/sanityClient";
import Header from "../components/Header";
import Hero from "../components/Hero";

const style = {
  wrapper: ``,
  walletConnectWrapper: `flex flex-col justify-center items-center h-screen w-screen bg-[#3b3d42] `,
  button: `border border-[#282b2f] bg-[#2081e2] p-[0.8rem] text-xl font-semibold rounded-lg cursor-pointer text-black`,
  details: `text-lg text-center text=[#282b2f] font-semibold mt-4`,
};

const Home: NextPage = () => {
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
    })();
  }, [address]);

  return (
    <div className={style.wrapper}>
      {address ? (
        <>
          <Head>
            <title>NexToken</title>
            <meta name="description" content="Buy/Sell NFTs" />
          </Head>
          <Header></Header>
          <Hero></Hero>
        </>
      ) : (
        <div className={style.walletConnectWrapper}>
          <button
            className={style.button}
            onClick={() => connectWallet("injected")}
          >
            Connect Wallet
          </button>
          <div className={style.details}>
            Make sure you're using a suitable browser and have Metamask
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
