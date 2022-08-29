// Set of helper functions to facilitate wallet setup

import { Chain, ConnectorNames } from "../config/types";
import { connectorLocalStorageKey } from "../config";

export const chainLocalKey = "chain";

enum OverrideProviderMap {
  METAMASK = 'MetaMask',
  COINBASE = "CoinbaseWallet"
};

const checkProvider = (ethereum: any): Ethereum | undefined => {
  if (ethereum?.overrideIsMetaMask) {
    return ethereum.providerMap.get(OverrideProviderMap.METAMASK) || Array.from(ethereum.providerMap.values())[0]
  }
  
  if (ethereum?.isMetaMask) {
    return ethereum;
  }
  
  return undefined;
}

export const getProvider = (connectorId?: string): Ethereum | BinanceChain | undefined => {
  return connectorId || localStorage.getItem(connectorLocalStorageKey) === ConnectorNames.BSC
    ? window.BinanceChain || checkProvider(window.ethereum) // The plugin may not be installed
    : checkProvider(window.ethereum)
};

export const checkIfMatch = async (chain?: Chain) => {
  const provider = getProvider();
  if (provider) {
    const chainId = await provider.request({ method: "eth_chainId" }); // from wallet plugin
    return chainId === chain?.config?.chainId;
  }
  return false;
};

/**
 * Prompt the user to add BSC as a network on Metamask, or switch to BSC if the wallet is on a different network
 * @param {Chain} chain
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
export const setupNetwork = async (chain?: Chain) => {
  // should be switching if chain argument is posted
  const isSwitching = !!chain;

  if (!isSwitching) {
    // read chain config from cache
    const chainCache = localStorage.getItem(chainLocalKey);
    if (chainCache) {
      chain = JSON.parse(chainCache);
    }
  }

  // support binance wallet
  const provider = getProvider();

  if (provider) {
    try {
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chain?.config?.chainId }],
      });

      // should check chainId if match between plugin and local config
      const chainId = await provider.request({ method: "eth_chainId" }); // from wallet plugin
      const matched = chainId === chain?.config?.chainId;
      if (isSwitching && matched) {
        localStorage.setItem(chainLocalKey, JSON.stringify(chain));
      }
      if (!matched) {
        localStorage.removeItem(chainLocalKey);
      }

      return matched;
    } catch (error) {
      console.error(error);
      // This error code indicates that the chain has not been added to MetaMask.
      // Should add the chain
      if ((error as any)?.code === 4902) {
        try {
          await provider.request({
            method: "wallet_addEthereumChain",
            params: [chain?.config],
          });
          return true;
        } catch (otherError) {
          console.error(otherError);
          return false;
        }
      }
      return false;
    }
  } else {
    console.error(
      "Can't setup the BSC network on metamask because window.ethereum is undefined"
    );
    return false;
  }
};

/**
 * Prompt the user to add a custom token to metamask
 * @param tokenAddress
 * @param tokenSymbol
 * @param tokenDecimals
 * @param tokenImage
 * @returns {boolean} true if the token has been added, false otherwise
 */
export const registerToken = async (
  tokenAddress: string,
  tokenSymbol: string,
  tokenDecimals: number,
  tokenImage: string
) => {
  const tokenAdded = await window?.ethereum?.request({
    method: "wallet_watchAsset",
    params: {
      type: "ERC20",
      options: {
        address: tokenAddress,
        symbol: tokenSymbol,
        decimals: tokenDecimals,
        image: tokenImage,
      },
    },
  });

  return tokenAdded;
};
