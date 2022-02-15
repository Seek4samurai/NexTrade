import { useWeb3 } from "@3rdweb/hooks";
import type { NFTModule, NFTMetadataOwner } from "@3rdweb/sdk";
import { ThirdwebSDK } from "@3rdweb/sdk";

import { useRouter } from "next/router";
import React, { useMemo } from "react";
import Header from "../../components/Header";

const style = {
  container: ``,
  wrapper: `grid gap-4 grid-cols-3`,
};

const allCollection = () => {
  const router = useRouter();

  const projectAddress = "0x4129AE943300e6A463baE532E1289F3F31e42C50";
  const provider = useWeb3();

  const sdk = new ThirdwebSDK();

  return (
    <div>
      <Header></Header>
      <div className={style.container}>{/* <div>{response}</div> */}</div>
    </div>
  );
};

export default allCollection;
