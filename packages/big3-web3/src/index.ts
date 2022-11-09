// initial chain info
import { useEffect, useState } from 'react'
import { chainLocalKey } from './config'
import { chains } from './config/chains'
import { Chain, ChainNetwork } from './config/types'
import { checkIfMatch, getProvider } from './utils/network'
import { ethers } from 'ethers'
import sample from 'lodash.sample'
import useForceUpdate from './hook/useForceUpdate'

const chainNetwork = Object.values(chains)[0] as ChainNetwork
export const defaultChain = { name: chainNetwork.chainName, config: chainNetwork }

export const initChainModel = () => {
  const [matched, setMatched] = useState(false)
  const [accounts, setAccounts] = useState<string[]>([])
  const [chainChanged, setChainChanged] = useState(false)
  const [accountsChanged, setAccountsChanged] = useState(false)
  const [allNotConnected, setAllNotConnected] = useState(false)
  const [accountDisconnected, setAccountDisconnected] = useState(false)
  const [accountConnected, setAccountConnected] = useState(false)
  const [chain, setChain] = useState<Chain>(defaultChain)
  const { forceUpdate, trigger } = useForceUpdate()

  // reset
  useEffect(() => {
    setMatched(false)
    setAccounts([])
    setChainChanged(false)
    setAccountsChanged(false)
    setAllNotConnected(false)
    setAccountDisconnected(false)
    setAccountConnected(false)
    setChain(defaultChain)
  }, [trigger])

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
          forceUpdate()
        }

        setMatched(isRightChain)
      })()
    } catch (error) {
      console.error('failed to initilize the web3 enviroment.', error?.toString())
      localStorage.setItem(chainLocalKey, JSON.stringify(defaultChain))
      checkIfMatch(defaultChain).then(res => setMatched(res))
    }
  }, [trigger])

  useEffect(() => {
    ;(async () => {
      const provider: any = getProvider()
      if (provider) {
        const accounts = await provider.request({ method: 'eth_accounts' })
        setAccounts(accounts)
      }
    })()
  }, [trigger])

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
      if (provider) {
        provider.removeListener('chainChanged', handleChainChanged)
        provider.removeListener('accountsChanged', handleAccountsChanged)
      }
    }
  }, [trigger, accounts])

  return {
    chain,
    accounts,
    setChain,
    matched,
    setMatched,
    chainChanged,
    accountsChanged,
    allNotConnected, // no account is connected
    accountDisconnected, // deactive account
    accountConnected, // active account
    refresh: forceUpdate,
    refreshKey: trigger
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
