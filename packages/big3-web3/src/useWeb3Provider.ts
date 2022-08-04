import { useEffect, useState, useRef } from 'react'
import { ethers } from 'ethers'
import { useWeb3React } from '.'

/**
 * Provides a web3 provider with or without user's signer
 * Recreate web3 instance only if the provider change
 */
const useWeb3Provider = (
  simpleRpcProvider?: any
): {
  provider: ethers.providers.JsonRpcProvider | ethers.providers.Web3Provider
  readyState: boolean
} => {
  const { library } = useWeb3React()
  const refEth = useRef(library)
  const [provider, setProvider] = useState(library || simpleRpcProvider)
  const [readyState, setReadyState] = useState(false)
  const { account } = useWeb3React()

  useEffect(() => {
    if (!account) {
      setReadyState(false)
    }
  }, [account])

  useEffect(() => {
    if (library !== refEth.current && account) {
      setProvider(library || simpleRpcProvider)
      refEth.current = library
      setReadyState(true)
    }
  }, [library, account])

  return { provider, readyState }
}

export default useWeb3Provider
