// initial chain info
import { useEffect, useState } from "react";
import { chainLocalKey } from "./config";
import { chains } from "./config/chains";
import { Chain as DataType, ChainConfig } from "./config/types";
import { setupNetwork, checkIfMatch, getProvider } from "./utils/network";

const defaultChain: DataType = {
  name: (Object.values(chains)[0] as ChainConfig).chainName,
  config: Object.values(chains)[0] as ChainConfig,
};

export const initChainModel = () => {
  const [matched, setMatched] = useState(false);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [chainChanged, setChainChanged] = useState(false);
  const [accountsChanged, setAccountsChanged] = useState(false);
  const [allNotConnected, setAllNotConnected] = useState(false);
  const [accountDisconnected, setAccountDisconnected] = useState(false);
  const [accountConnected, setAccountConnected] = useState(false);
  const [chain, setChain] = useState<DataType>(defaultChain);

  // initial chain config
  useEffect(() => {
    let chainConfig = localStorage.getItem(chainLocalKey);

    if (!chainConfig) {
      // TODO explore way if switch
      // setupNetwork(defaultChain);
      checkIfMatch(defaultChain).then((res) => setMatched(res));
    } else if (chainConfig.startsWith("{") && chainConfig.endsWith("}")) {
      const cachedChain = JSON.parse(chainConfig);
      setChain(cachedChain);
      checkIfMatch(cachedChain).then((res) => setMatched(res));
      setupNetwork(cachedChain);
    } else {
      localStorage.clear();
      location.reload();
    }
  }, []);

  useEffect(() => {
    (async () => {
      const provider: any = getProvider();
      if (provider) {
        const accounts = await provider.request({ method: "eth_accounts" });
        setAccounts(accounts);
      }
    })();
  }, []);

  useEffect(() => {
    const provider: any = getProvider();
    const handleChainChanged = () => setChainChanged(true);
    const handleAccountsChanged = (_accounts: string[]) => {
      setAllNotConnected(_accounts.length === 0);
      setAccountDisconnected(_accounts.length < accounts.length);
      setAccountConnected(_accounts.length > accounts.length);
      setAccountsChanged(true);
    };

    if (provider) {
      provider.on("chainChanged", handleChainChanged);
      provider.on("accountsChanged", handleAccountsChanged);
    }

    return () => {
      provider.removeListener("chainChanged", handleChainChanged);
      provider.removeListener("accountsChanged", handleAccountsChanged);
    };
  }, [accounts]);

  return {
    chain,
    accounts,
    setChain,
    matched,
    chainChanged,
    accountsChanged,
    allNotConnected, // no account is connected
    accountDisconnected, // deactive account
    accountConnected, // active account
  };
};

// export
export { Config, Chain } from "./config/types";
export { default as connectors } from "./config/wallet";
export { chains } from "./config/chains";
export * from "./config";

export { default as useAuth } from "./useAuth";
export { default as useWallet } from "./useWallet";
export { default as useChain } from "./useChain";
export { default as useEagerConnect } from "./useEagerConnect";

export { getLibrary, ConnectorNames, connectorsByName } from "./utils/web3";
export { setupNetwork } from "./utils/network";

export * from "@web3-react/core";
