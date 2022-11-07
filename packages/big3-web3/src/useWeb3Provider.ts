import { useEffect, useState, useRef } from 'react'
import { ethers } from 'ethers'
import { useWeb3React } from '.'

/**
 * Provides a web3 provider with or without user's signer
 * Recreate web3 instance only if the provider change
 */
type Provider = ethers.providers.JsonRpcProvider | ethers.providers.Web3Provider
const useWeb3Provider = (simpleRpcProvider?: Provider): { provider: Provider } => {
  const { library } = useWeb3React()
  const refEth = useRef(library)
  const [provider, setProvider] = useState(library || simpleRpcProvider)
  const { account } = useWeb3React()

  useEffect(() => {
    if (library !== refEth.current && account) {
      setProvider(library || simpleRpcProvider)
      refEth.current = library
    }
  }, [library, account])

  return { provider }
}

export default useWeb3Provider
