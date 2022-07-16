import { ChainScope } from "config";
import { Chain, ChainConfig, ChainModel } from "config/types";
import { useCallback } from "react";
import { chains, setupNetwork } from ".";

const useChain = ({ setChain }: ChainModel) => {
  const switchChain = useCallback(async (key: ChainScope) => {
    const config: Chain = { name: key, config: chains[key] as ChainConfig };
    if (await setupNetwork(config)) {
      setChain(config);
    }
  }, []);

  return { switchChain };
};

export default useChain;
