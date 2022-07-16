import { useCallback } from 'react'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { NoBscProviderError } from '@binance-chain/bsc-connector'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected
} from '@web3-react/injected-connector'
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector
} from '@web3-react/walletconnect-connector'
import { ConnectorNames, connectorsByName } from './utils/web3'
import { setupNetwork } from './utils/network'
import { connectorLocalStorageKey } from './config'

// api for login and logout
const useAuth = () => {
  const { activate, deactivate, setError, error } = useWeb3React()
  const login = useCallback(
    async (connectorId: ConnectorNames) => {
      const connector = connectorsByName[connectorId]
      if (connector) {
        await activate(connector, async (error: Error) => {
          if (error instanceof UnsupportedChainIdError) {
            const hasSetUp = await setupNetwork()
            if (hasSetUp) {
              await activate(connector)
            }
          } else {
            window.localStorage.removeItem(connectorLocalStorageKey)
            if (error instanceof NoEthereumProviderError || error instanceof NoBscProviderError) {
              setError(new Error("Provider error, no provider was found"));
            } else if (
              error instanceof UserRejectedRequestErrorInjected ||
              error instanceof UserRejectedRequestErrorWalletConnect
            ) {
              if (connector instanceof WalletConnectConnector) {
                const walletConnector = connector as WalletConnectConnector
                walletConnector.walletConnectProvider = null
              }
              setError(
                new Error("Authorization Error, Please authorize to access your account")
              );
            } else {
              setError(error);
            }
          }
        })
        window.localStorage.setItem(connectorLocalStorageKey, connectorId)
      } else {
        alert('Unable to find connector')
      }
    },
    [activate]
  )
  const logout = useCallback(() => {
    deactivate()
    // This localStorage key is set by @web3-react/walletconnect-connector
    if (window.localStorage.getItem('walletconnect')) {
      connectorsByName[ConnectorNames.WalletConnect].close()
      connectorsByName[ConnectorNames.WalletConnect].walletConnectProvider = null
    }
    window.location.reload();
  }, [deactivate])

  return { login, logout, error };
}

export default useAuth
