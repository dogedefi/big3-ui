import React from 'react'

import IconMetamask from '../assets/images/icon-metamask.svg'
import IconWalletconnect from '../assets/images/icon-walletconnect.svg'
import IconBinance from '../assets/images/icon-binance.svg'
import IconMath from '../assets/images/icon-math.svg'
import IconTrust from '../assets/images/icon-trust.svg'
import IconOKEx from '../assets/images/icon-okex.svg'

const Metamask = () => <img src={IconMetamask} />
const WalletConnect = () => <img src={IconWalletconnect} />
const TrustWallet = () => <img src={IconTrust} />
const MathWallet = () => <img src={IconMath} />
const BinanceWallet = () => <img src={IconBinance} />
const OKExWallet = () => <img src={IconOKEx} />

import { Config, ConnectorNames } from './types'

const connectors: Config[] = [
  {
    title: 'Metamask',
    icon: Metamask,
    connectorId: ConnectorNames.Injected,
    priority: 1
  },
  {
    title: 'WalletConnect',
    icon: WalletConnect,
    connectorId: ConnectorNames.WalletConnect,
    priority: 2
  },
  {
    title: 'Trust Wallet',
    icon: TrustWallet,
    connectorId: ConnectorNames.Injected,
    priority: 3
  },
  {
    title: 'MathWallet',
    icon: MathWallet,
    connectorId: ConnectorNames.Injected,
    priority: 999
  },
  {
    title: 'BinanceWallet',
    icon: BinanceWallet,
    connectorId: ConnectorNames.BSC,
    priority: 999
  },
  {
    title: 'OKExWallet',
    icon: OKExWallet,
    connectorId: ConnectorNames.Injected,
    priority: 999
  }
]

export default connectors
