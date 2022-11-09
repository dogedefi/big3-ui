import { Chain, ChainHookOptions } from 'config/types'
import { useCallback } from 'react'
import { setupNetwork } from '.'

const useChain = ({ setChain, setMatched }: ChainHookOptions) => {
  const switchChain = useCallback(async (config: Chain) => {
    if (await setupNetwork(config)) {
      setChain(config)
      setMatched(true)
    }
  }, [])

  return { switchChain }
}

export default useChain
