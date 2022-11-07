// initial chain info
import { useEffect, useState } from 'react'
import { chainLocalKey } from './config'
import { chains } from './config/chains'
import { Chain, ChainNetwork } from './config/types'
import { checkIfMatch, getProvider } from './utils/network'
import { ethers } from 'ethers'
import sample from 'lodash.sample'

const defaultChain = Object.values(chains)[0] as ChainNetwork

export const initChainModel = () => {
  const [matched, setMatched] = useState(false)
  const [accounts, setAccounts] = useState<string[]>([])
  const [chainChanged, setChainChanged] = useState(false)
  const [accountsChanged, setAccountsChanged] = useState(false)
  const [allNotConnected, setAllNotConnected] = useState(false)
  const [accountDisconnected, setAccountDisconnected] = useState(false)
  const [accountConnected, setAccountConnected] = useState(false)
  const [chain, setChain] = useState<Chain>({ name: defaultChain.chainName, config: defaultChain })

  // initial chain config
  useEffect(() => {
    try {
      const network = JSON.parse(localStorage.getItem(chainLocalKey) || '')
      setChain(network)
      ;(async () => {
        const isGoodChain = await checkIfMatch(network)
        setMatched(isGoodChain)

        // if it's not a specified chain network, you need to reset the cache
        if (!isGoodChain) {
          localStorage.clear()
          location.reload()
        }
      })()
    } catch (error) {
      console.error('failed to initilize the web3 enviroment.', error?.toString())
      checkIfMatch({ name: defaultChain.chainName, config: defaultChain }).then(res => setMatched(res))
    }
  }, [])

  useEffect(() => {
    ;(async () => {
      const provider: any = getProvider()
      if (provider) {
        const accounts = await provider.request({ method: 'eth_accounts' })
        setAccounts(accounts)
      }
    })()
  }, [])

  useEffect(() => {
    const provider: any = getProvider()
    const handleChainChanged = () => setChainChanged(true)
    const handleAccountsChanged = (_accounts: string[]) => {
      setAllNotConnected(_accounts.length === 0)
      setAccountDisconnected(_accounts.length < accounts.length)
      setAccountConnected(_accounts.length > accounts.length)
      setAccountsChanged(true)
    }

    if (provider) {
      provider.on('chainChanged', handleChainChanged)
      provider.on('accountsChanged', handleAccountsChanged)
    }

    return () => {
      provider.removeListener('chainChanged', handleChainChanged)
      provider.removeListener('accountsChanged', handleAccountsChanged)
    }
  }, [accounts])

  return {
    chain,
    accounts,
    setChain,
    matched,
    chainChanged,
    accountsChanged,
    allNotConnected, // no account is connected
    accountDisconnected, // deactive account
    accountConnected // active account
  }
}

export const SimpleProviderFactory = {
  create(rpcUrl: string | string[]) {
    return new ethers.providers.JsonRpcProvider(sample(rpcUrl))
  }
}

// export
export { default as connectors } from './config/wallet'

export { default as useAuth } from './useAuth'
export { default as useWallet } from './useWallet'
export { default as useChain } from './useChain'
export { default as useEagerConnect } from './useEagerConnect'
export { default as useWeb3Provider } from './useWeb3Provider'

export * from './utils/web3'
export * from './utils/network'
export * from '@web3-react/core'
export * from './config'
export * from './config/chains'
export * from './config/types'
