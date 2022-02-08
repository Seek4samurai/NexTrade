import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThirdwebWeb3Provider } from "@3rdweb/hooks";

// 4 = Rinkeyby chain network - for others check on chainlist.org bro
const supportedChainIds = [4];
const connector = {
  injected: {},
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebWeb3Provider
      supportedChainIds={supportedChainIds}
      connectors={connector}
    >
      <Component {...pageProps} />;
    </ThirdwebWeb3Provider>
  );
}

export default MyApp;
