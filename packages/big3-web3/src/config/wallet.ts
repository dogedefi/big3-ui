import { Config, ConnectorNames } from './types'

const connectors: Config[] = [
  {
    title: 'Metamask',
    connectorId: ConnectorNames.Injected,
    priority: 1
  },
  {
    title: 'WalletConnect',
    connectorId: ConnectorNames.WalletConnect,
    priority: 2
  },
  {
    title: 'Trust Wallet',
    connectorId: ConnectorNames.Injected,
    priority: 3
  },
  {
    title: 'MathWallet',
    connectorId: ConnectorNames.Injected,
    priority: 999
  },
  {
    title: 'BinanceWallet',
    connectorId: ConnectorNames.BSC,
    priority: 999
  },
  {
    title: 'OKExWallet',
    connectorId: ConnectorNames.Injected,
    priority: 999
  }
]

export default connectors
