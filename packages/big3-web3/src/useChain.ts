import { ChainScope } from "config";
import { Chain, ChainNetwork, ChainHookOptions } from "config/types";
import { useCallback } from "react";
import { chains, setupNetwork } from ".";

const useChain = ({ setChain }: ChainHookOptions) => {
  const switchChain = useCallback(async (key: ChainScope) => {
    const config: Chain = { name: key, config: chains[key] as ChainNetwork };
    if (await setupNetwork(config)) {
      setChain(config);
    }
  }, []);

  return { switchChain };
};

export default useChain;
