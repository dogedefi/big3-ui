import { ethers } from 'ethers'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { BscConnector } from '@binance-chain/bsc-connector'
import { chainIds } from '../config/chains'

const POLLING_INTERVAL = 12000

// Allow to specify a chainId
const supportedChainIds = Array.from(new Set(chainIds))

export const getLibrary = (provider: any): ethers.providers.Web3Provider => {
  const library = new ethers.providers.Web3Provider(provider)
  library.pollingInterval = POLLING_INTERVAL
  return library
}

const injected = new InjectedConnector({ supportedChainIds })

const walletconnect = new WalletConnectConnector({
  supportedChainIds,
  bridge: 'https://pancakeswap.bridge.walletconnect.org/',
  qrcode: true
})

const bscConnector = new BscConnector({ supportedChainIds })

export enum ConnectorNames {
  Injected = 'Injected',
  WalletConnect = 'WalletConnect',
  BSC = 'BSC'
}

export const connectorsByName = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
  [ConnectorNames.BSC]: bscConnector
}
