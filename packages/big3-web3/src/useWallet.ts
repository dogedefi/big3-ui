import { useCallback, useMemo } from "react";
import {
  connectorLocalStorageKeyV2,
  walletLocalStorageKey,
  useAuth,
  connectedKey,
  ConnectorNames,
  connectors as config,
  Chain,
  ChainScope,
} from ".";

const useWallet = (chain: Chain) => {
  const { login, logout } = useAuth();

  const disconnect = useCallback(() => {
    logout();

    // localStorage.setItem(connectedKey, "disconnected");
    // localStorage.removeItem(walletLocalStorageKey);
    // localStorage.removeItem(connectorLocalStorageKeyV2);
    localStorage.clear();
  }, []);

  const connect = useCallback(async (walletConfig) => {
    // About MSStream: https://docs.microsoft.com/en-us/previous-versions/hh772328(v=vs.85)
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    // Since iOS does not support Trust Wallet we fall back to WalletConnect
    if (walletConfig.title === "Trust Wallet" && isIOS) {
      await login(ConnectorNames.WalletConnect);
    } else {
      await login(walletConfig.connectorId);
    }

    localStorage.setItem(connectedKey, "connected");
    localStorage.setItem(walletLocalStorageKey, walletConfig.title);
    localStorage.setItem(connectorLocalStorageKeyV2, walletConfig.connectorId);
  }, []);

  const connectors = useMemo(() => {
    return config.filter((connector) => {
      if (chain?.name === ChainScope.OEC) {
        return !["BinanceWallet"].includes(connector.title);
      }
      if (chain?.name === ChainScope.BSC) {
        return !["OKExWallet"].includes(connector.title);
      }
      return !["BinanceWallet", "OKExWallet"].includes(connector.title);
    });
  }, [chain]);

  return { connect, disconnect, connectors };
};

export default useWallet;
