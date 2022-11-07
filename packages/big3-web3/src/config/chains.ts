import { ChainNetwork } from './types'

export const defaultChains = {
  BSC: {
    chainId: __DEV__ ? '0x38' : '0x61',
    chainName: __DEV__ ? 'Binance Smart Chain' : 'Binance Testnet',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: [__DEV__ ? 'https://bsc-dataseed.binance.org/' : 'https://data-seed-prebsc-2-s3.binance.org:8545/'],
    blockExplorerUrls: [__DEV__ ? 'https://bscscan.com/' : 'https://testnet.bscscan.com/'],
  },
  ETH: {
    chainId: __DEV__ ? '0x1' : '0x3',
    chainName: __DEV__ ? 'ETH Mainnet' : 'ETH Testnet',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: [
      __DEV__
        ? 'https://mainnet.infura.io/v3/a892bade64884ad6a13cf9981de659eb'
        : 'https://ropsten.infura.io/v3/a892bade64884ad6a13cf9981de659eb',
    ],
    blockExplorerUrls: [__DEV__ ? 'https://etherscan.io/' : 'https://ropsten.etherscan.io/'],
  },
  OEC: {
    chainId: __DEV__ ? '0x42' : '0x41',
    chainName: __DEV__ ? 'OKEx Mainnet' : 'OKEx Testnet',
    nativeCurrency: {
      name: 'OKT',
      symbol: 'OKT',
      decimals: 18,
    },
    rpcUrls: [__DEV__ ? 'https://exchainrpc.okex.org' : 'https://exchaintestrpc.okex.org'],
    blockExplorerUrls: [__DEV__ ? 'https://www.oklink.com/oec/' : 'https://www.oklink.com/oec-test/'],
  },
}

// json -> window.chains -> default
export const chains = process.env.CHAIN_ENV
  ? require(`/chain.${process.env.CHAIN_ENV}`)
  : window.chains || defaultChains
console.log('chains config:', chains)

export const chainIds = (Object.values(chains) as ChainNetwork[]).map((chain) => parseInt(chain?.chainId))
