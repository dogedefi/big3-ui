// initial chain info
import { useEffect, useState } from 'react'
import { chainLocalKey } from './config'
import { chains } from './config/chains'
import { Chain, ChainNetwork } from './config/types'
import { checkIfMatch, getProvider } from './utils/network'
import { ethers } from 'ethers'
import sample from 'lodash.sample'

const chainNetwork = Object.values(chains)[0] as ChainNetwork
export const defaultChain = { name: chainNetwork.chainName, config: chainNetwork }

const CACHE_WEB3_IS_SUPPORTED_CHAIN = 'WEB3_IS_SUPPORTED_CHAIN'
const CACHE_WEB3_CURRENT_WALLET = 'WEB3_CURRENT_WALLET'

export const initChainModel = () => {
  const [matched, setMatched] = useState(Boolean(localStorage.getItem(CACHE_WEB3_IS_SUPPORTED_CHAIN) ?? 'false'))
  const [accounts, setAccounts] = useState<string[]>([])
  const [switchingChain, setSwitchingChain] = useState(false)
  const [switchingAccount, setSwitchingAccount] = useState(false)
  const [allNotConnected, setAllNotConnected] = useState(false)
  const [accountDisconnected, setAccountDisconnected] = useState(false)
  const [accountConnected, setAccountConnected] = useState(false)
  const [chain, setChain] = useState<Chain>(defaultChain)

  // Update cache from local storage
  useEffect(() => {
    localStorage.setItem(CACHE_WEB3_IS_SUPPORTED_CHAIN, String(matched))
  }, [matched])

  // initial chain config
  useEffect(() => {
    try {
      const chain = JSON.parse(localStorage.getItem(chainLocalKey) || '')
      setChain(chain)
      ;(async () => {
        const isRightChain = await checkIfMatch(chain)

        // if it's not a specified chain network, you need to reset the cache
        if (!isRightChain) {
          localStorage.removeItem(chainLocalKey)
        }

        setMatched(isRightChain)
        setSwitchingChain(false)
      })()
    } catch (error) {
      console.error('failed to initilize the web3 enviroment.', error?.toString())
      localStorage.setItem(chainLocalKey, JSON.stringify(defaultChain))
      checkIfMatch(defaultChain)
        .then(res => setMatched(res))
        .finally(() => setSwitchingChain(false))
    }
  }, [switchingChain])

  useEffect(() => {
    ;(async () => {
      const provider: any = getProvider()
      if (provider) {
        const accounts = await provider.request({ method: 'eth_accounts' })
        setAccounts(accounts)
        setSwitchingAccount(false)
      }
    })()
  }, [switchingChain, switchingAccount])

  useEffect(() => {
    const provider: any = getProvider()
    const handleChainChanged = () => setSwitchingChain(true)
    const handleAccountsChanged = (_accounts: string[]) => {
      setAllNotConnected(_accounts.length === 0)
      setAccountDisconnected(_accounts.length < accounts.length)
      setAccountConnected(_accounts.length > accounts.length)
      setSwitchingAccount(true)
      localStorage.setItem(CACHE_WEB3_CURRENT_WALLET, (window.ethereum as any)?.selectedAddress)
    }

    if (provider) {
      provider.on('chainChanged', handleChainChanged)
      provider.on('accountsChanged', handleAccountsChanged)
    }

    return () => {
      if (provider) {
        provider.removeListener('chainChanged', handleChainChanged)
        provider.removeListener('accountsChanged', handleAccountsChanged)
      }
    }
  }, [matched]) // update provider

  return {
    chain,
    accounts,
    setChain,
    matched,
    setMatched,
    switchingChain,
    switchingAccount,
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
