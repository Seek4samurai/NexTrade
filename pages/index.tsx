import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/header";

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>NexToken</title>
        <meta name="description" content="Buy/Sell NFTs" />
      </Head>
      <Header></Header>
    </div>
  );
};

export default Home;
